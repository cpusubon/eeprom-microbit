# eprom-microbit
---
This extension supports EEPROM Write/Read in MakeCode

* I2C address 0x50

## Method
---
* Read byte
```
EEPROM.readb(adr)
```

* Read word
```
EEPROM.readw(adr)
```

* Write byte
```
EEPROM.write(adr, db)
```

* Write word
```
EEPROM.writew(adr, dw)
```

## Example
---
```
EEPROM.writeb(0, 1)
EEPROM.writew(1, 123)
serial.writeNumber(EEPROM.readb(0))
serial.writeNumber(EEPROM.readw(1))
```

## License
MIT

## Supported targets

* for PXT/microbit

