#include <Arduino.h>
#include "pump.h"

uuid::log::Logger Pump::logger_{F_(pump), uuid::log::Facility::CONSOLE};


void Pump::Initialize() {
    LOG_INFO("Initializing pump");
    pinMode(PUMP_PIN,OUTPUT);
    m_bInitialized = true;
} 

void Pump::StartPump() {
    if (!m_bInitialized) Initialize();
    if (m_bPumpOn == 0x00) LOG_INFO("Starting pump");
    m_bPumpOn = 0xff;
    digitalWrite(PUMP_PIN,HIGH);
}
void Pump::StopPump() {
    if (!m_bInitialized) Initialize();
    if (m_bPumpOn == 0xff) LOG_INFO("Stopping pump");
    m_bPumpOn = 0x00;
    digitalWrite(PUMP_PIN,LOW);
}

void Pump::setPump(bool state,bool force) {
    if (!m_bInitialized) Initialize();
    LOG_INFO("Set Pump %s with force: %s",state ? "on" : "off",force ? "true" : "false");
    if (state) {
        if (force) {
            xTimerStop(m_pumpStopTimer, 0);
            xTimerStop(m_pumpForceTimer, 0);
            xTimerStart(m_pumpForceTimer, 0);
            StartPump();
        }
        else  {
            xTimerStop(m_pumpStopTimer, 0);
            xTimerStart(m_pumpStartTimer, 0);
            xTimerStop(m_pumpForceTimer, 0);
        }
    }
    else {
        if (force) {
             if (!xTimerIsTimerActive(m_pumpForceTimer)) return;
            xTimerStop(m_pumpForceTimer, 0);
            StopPump();
        }
        else {
            if (xTimerIsTimerActive(m_pumpForceTimer)) return;
            xTimerStop(m_pumpStartTimer, 0);
            xTimerStart(m_pumpStopTimer, 0);

        }

    }
}

uint8_t             Pump::m_bPumpOn = 0x00;
bool                Pump::m_bInitialized = false;
TimerHandle_t       Pump::m_pumpStartTimer = xTimerCreate("pumpStartTimer", pdMS_TO_TICKS(1000*6), pdFALSE, (void*)0, reinterpret_cast<TimerCallbackFunction_t>(StartPump));
TimerHandle_t       Pump::m_pumpStopTimer  = xTimerCreate("pumpStopTimer", pdMS_TO_TICKS(1000*60*5), pdFALSE, (void*)0, reinterpret_cast<TimerCallbackFunction_t>(StopPump));
TimerHandle_t       Pump::m_pumpForceTimer  = xTimerCreate("pumpForceTimer", pdMS_TO_TICKS(1000*60*30), pdFALSE, (void*)0, reinterpret_cast<TimerCallbackFunction_t>(StopPump));


