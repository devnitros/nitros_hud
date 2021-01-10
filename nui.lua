local display = false

RegisterCommand("hudayar", function(source, args)
    SetDisplay(not display)
end)

--very important cb 
RegisterNUICallback("exit", function(data)
    SetDisplay(false)
end)

RegisterNUICallback("main", function(data)
    SetDisplay(false)
end)

RegisterNUICallback("error", function(data)
    SetDisplay(false)
end)

function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "ui",
        status = bool,
    })
end

Citizen.CreateThread(function()
    while display do
        Citizen.Wait(5)
        DisableControlAction(0, 1, display) 
        DisableControlAction(0, 2, display) 
        DisableControlAction(0, 142, display) 
        DisableControlAction(0, 18, display) 
        DisableControlAction(0, 322, display) 
        DisableControlAction(0, 106, display) 
    end
end)

local displayRadar = false
local ped = nil 
local inVehicle = false
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(250)
        ped = PlayerPedId()
        inVehicle = IsPedInAnyVehicle(ped, false)
    end
end)


Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100)
        if ped ~= nil then
            if not displayRadar then
                DisplayRadar(inVehicle)
            elseif displayRadar then
                DisplayRadar(false)
            end
        end
    end
end)



RegisterNUICallback('RadarState', function(data)
    displayRadar = not data.radar
end)

function chat(str, color)
    TriggerEvent(
        'chat:addMessage',
        {
            color = color,
            multiline = true,
            args = {str}
        }
    )
end
