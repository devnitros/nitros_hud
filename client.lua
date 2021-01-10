local Keys = {
    ["ESC"] = 322, ["F1"] = 288, ["F2"] = 289, ["F3"] = 170, ["F5"] = 166, ["F6"] = 167, ["F7"] = 168, ["F8"] = 169, ["F9"] = 56, ["F10"] = 57,
    ["~"] = 243, ["1"] = 157, ["2"] = 158, ["3"] = 160, ["4"] = 164, ["5"] = 165, ["6"] = 159, ["7"] = 161, ["8"] = 162, ["9"] = 163, ["-"] = 84, ["="] = 83, ["BACKSPACE"] = 177,
    ["TAB"] = 37, ["Q"] = 44, ["W"] = 32, ["E"] = 38, ["R"] = 45, ["T"] = 245, ["Y"] = 246, ["U"] = 303, ["P"] = 199, ["["] = 39, ["]"] = 40, ["ENTER"] = 18,
    ["CAPS"] = 137, ["A"] = 34, ["S"] = 8, ["D"] = 9, ["F"] = 23, ["G"] = 47, ["H"] = 74, ["K"] = 311, ["L"] = 182,
    ["LEFTSHIFT"] = 21, ["Z"] = 20, ["X"] = 73, ["C"] = 26, ["V"] = 0, ["B"] = 29, ["N"] = 249, ["M"] = 244, [","] = 82, ["."] = 81,
    ["LEFTCTRL"] = 36, ["LEFTALT"] = 19, ["SPACE"] = 22, ["RIGHTCTRL"] = 70,
    ["HOME"] = 213, ["PAGEUP"] = 10, ["PAGEDOWN"] = 11, ["DELETE"] = 178,
    ["LEFT"] = 174, ["RIGHT"] = 175, ["TOP"] = 27, ["DOWN"] = 173,
    ["NENTER"] = 201, ["N4"] = 108, ["N5"] = 60, ["N6"] = 107, ["N+"] = 96, ["N-"] = 97, ["N7"] = 117, ["N8"] = 61, ["N9"] = 118
}

local status = nil
local r,g,b,a = 30,136,229,255 

local hudStatus = true
local pauseState = true
local tokovoipstate = 1
local isTalking = false

Citizen.CreateThread(function()
    while true do
        if hudStatus then
            DisplayHud(false)
            TriggerEvent('esx_status:getStatus', 'hunger', function(hunger)
                TriggerEvent('esx_status:getStatus', 'thirst', function(thirst)
                    local myhunger = hunger.getPercent()
                    local mythirst = thirst.getPercent()
                    local status = {myhunger, mythirst}
                    SendNUIMessage({
                        action = "updateStatus",
                        show = pauseState,
                        st = status,
                    })
                end)
            end)
        -- else
        --     SendNUIMessage({
        --         show = hudStatus,
        --     })
        end
        Citizen.Wait(5000)
    end
end)


RegisterNetEvent('nitros-hud:toggleTokoVOIP')
AddEventHandler('nitros-hud:toggleTokoVOIP', function(state)
    tokovoipstate = state
end)

RegisterNetEvent('nitros-hud:setTalkingState')
AddEventHandler('nitros-hud:setTalkingState', function(state)
    isTalking = state
end)

Citizen.CreateThread(function()
    while true do
        if hudStatus then
            local ped = PlayerPedId()
            local id = PlayerId()
            local health = GetEntityHealth(ped) - 100
            local armor = GetPedArmour(ped)
            local stamina = 100-GetPlayerSprintStaminaRemaining(id)
            local oxy = GetPlayerUnderwaterTimeRemaining(id) * 10
            pauseState = not IsPauseMenuActive()
            SendNUIMessage({
                action = "updateBasics",
                show = pauseState,
                health = health,
                armor = armor,
                stamina = stamina,
                inwater = IsEntityInWater(ped),
                oxygen = oxy,
                talking = isTalking
            })
        else
            SendNUIMessage({
                show = hudStatus,
            })
            Citizen.Wait(500)
        end
        Citizen.Wait(200)
    end
end)

Citizen.CreateThread(function()
    while true do
        if blackBars then
            DisplayRadar(false)
            DrawRect(1.0, 1.0, 2.0, 0.25, 0, 0, 0, 255)
            DrawRect(1.0, 0.0, 2.0, 0.25, 0, 0, 0, 255)
        end
        Citizen.Wait(5)
    end
end)

RegisterNUICallback('SinematikState', function(data)
    blackBars = data.sinematik
end)

RegisterNetEvent('nitros:hudstate')
AddEventHandler('nitros:hudstate', function(state)
    hudStatus = state
end)



