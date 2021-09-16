/*
 * EMS-ESP - https://github.com/emsesp/EMS-ESP
 * Copyright 2020  Paul Derbyshire
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#include "controller.h"

namespace emsesp {

REGISTER_FACTORY(Controller, EMSdevice::DeviceType::CONTROLLER);

uuid::log::Logger Controller::logger_{F_(controller), uuid::log::Facility::CONSOLE};

Controller::Controller(uint8_t device_type, uint8_t device_id, uint8_t product_id, const std::string & version, const std::string & name, uint8_t flags, uint8_t brand)
    : EMSdevice(device_type, device_id, product_id, version, name, flags, brand) {

        register_telegram_type(0x06, F("RCTime"), false, MAKE_PF_CB(process_RCTime));
        register_device_value(TAG_NONE, &dateTime_, DeviceValueType::TEXT, nullptr, FL_(dateTime), DeviceValueUOM::NONE);


}


// publish HA config
bool Controller::publish_ha_config() {
    return true;
}

// process_RCTime - type 0x06 - date and time from a thermostat - 14 bytes long
void Controller::process_RCTime(std::shared_ptr<const Telegram> telegram) {
    if (telegram->offset > 0 || telegram->message_length < 5) {
        return;
    }

    if (flags() == EMS_DEVICE_FLAG_EASY) {
        return; // not supported
    }

    if (telegram->message_length < 7) {
        return;
    }

    auto timeold = dateTime_;
    // render time to HH:MM:SS DD/MM/YYYY
    // had to create separate buffers because of how printf works
    // IVT reports Year with high bit set.?
    char buf1[6];
    char buf2[6];
    char buf3[6];
    char buf4[6];
    char buf5[6];
    char buf6[6];
    snprintf_P(dateTime_,
               sizeof(dateTime_),
               PSTR("%s:%s:%s %s/%s/%s"),
               Helpers::smallitoa(buf1, telegram->message_data[2]),  // hour
               Helpers::smallitoa(buf2, telegram->message_data[4]),  // minute
               Helpers::smallitoa(buf3, telegram->message_data[5]),  // second
               Helpers::smallitoa(buf4, telegram->message_data[3]),  // day
               Helpers::smallitoa(buf5, telegram->message_data[1]),  // month
               Helpers::itoa(buf6, (telegram->message_data[0] & 0x7F) + 2000) // year
    );

    has_update((strcmp(timeold, dateTime_) != 0));
}

} // namespace emsesp