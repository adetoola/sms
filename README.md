# SMS
SMS is a succinct and flexible way to add Nigerian SMS providers integration to nodejs apps.

## Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [Security](#security)
- [Credits](#credits)
- [License](#license)

## Installation
Getting started with SMS is quite easy, just install using your favourite package manager. 

##### Using Yarn

``` bash
 yarn add @adetoola/sms
```

##### Using NPM

``` bash
 npm install @adetoola/sms
```

### Available SMS Gateway

You can specify any of the supported sms gateway from the list below:

- [x] Log (console.log)
- [x] SMS247Live
- [ ] XWireless
- [ ] 50Kobo
- [ ] SMSTube

``` js
import SMS from '@adetoola/SMS';

const sms = new SMS('SMSLive247');
```

### SMS Gateway Credentials

Each SMS service provider will give authorised users a set of credentials to use when sending SMS or interacting with their services. 

```env
# Log
SMS_SENDER='YOUR_SENDER_NAME_HERE'

# SMS247Live
SMS_SENDER='YOUR_SENDER_NAME_HERE'
SMS_SESSION_ID='YOUR_SESSION_ID_HERE'
```

## Usage
Using SMS is quite simple.

```js
sms = new SMS('SMSLive247');
sms.sender(sender).country(country).credentials(credentials);

message_id = sms.send('08123456789', 'Hi, I am using Adetoola SMS package');

console.log(message_id);
```

### Methods

| Method | SMS247LIVE |
| --- | --- |
| SMS::send(recipient, msg [, msg_type]) | **+** |
| SMS::schedule(recipient, msg, datetime[, msg_type]) | **+** |
| SMS::balance() | **+** |
| SMS::charge(msg_id) | **+** |
| SMS::status(msg_id) | **+** |
| SMS::coverage(recipient) | **+** |
| SMS::stop(msg_id) | **+** |
| SMS::history() | **+** |

### Valid Formats

| Input | Description | Accepted Formats |
| --- | --- | --- |
| `recipient` | Comma separated numbers, number or array | +2348012345678, 2348012345678, 8012345678, 0812345678 |
| `msg` | Text message which will be sent to the numbers. |[a-zA-Z0-9+_-."'\s]{1,160} |
| `sender` | Number to display as sender | [a-zA-Z0-9_-]{1,11} |
| `msg_type` | Normal SMS, Flash or MMS | TEXT, FLASH, MMS |
| `datetime` | Datetime in format `Y-m-d H:i:s`. | 2016-03-16 22:40:34 |
| `msg_id` | Message ID, provider by gateway | [a-zA-Z0-9] |

### Example

``` js
#coming soon!
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) and [CONDUCT](CONDUCT.md) for details.

## Security

If you discover any security related issues, please email adetola.onasanya@gmail.com instead of using the issue tracker.

## Credits

- [Adetola Onasanya](https://github.com/adetoola)

## License

SMS is an open-sourced package licensed under the [MIT license](http://opensource.org/licenses/MIT).
