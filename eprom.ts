/**
 * EEPROM block
 */
//% weight=100 color=#1eb0f0 icon="\uf2db" block="EEPROM"
namespace EEPROM {
    const i2cAddr = 0x50

    function readn(adr: number, n: number) {
        let mbit = 0
        if (adr >= 65536) {
            mbit = 1
            adr -= 65536
        }
        pins.i2cWriteNumber(i2cAddr | mbit, adr, NumberFormat.UInt16BE, false)
        return pins.i2cReadBuffer(i2cAddr | mbit, n, false)
    }
    /**
     * Read Memory Byte
     * @param adr describe parameter here, eg: 0
    */
    //% blockId="EEPROM_READB" block="readb addr %adr"
    //% weight=80 blockGap=8
    export function readb(adr: number): number {
        let buf = readn(adr, 1)
        return buf.getNumber(NumberFormat.UInt8LE, 0);
    }
    /**
     * Read Memory Word
     * @param adr describe parameter here, eg: 0
    */
    //% blockId="EEPROM_READW" block="readw addr %adr"
    //% weight=80 blockGap=8
    export function readw(adr: number): number {
        let buf = readn(adr, 2)
        return buf.getNumber(NumberFormat.UInt16BE, 0);
    }

    function writen(adr: number, d: number[], n: number) {
        let buf = pins.createBuffer(n + 2)
        let mbit = 0
        if (adr >= 65536) {
            mbit = 1
            adr -= 65536
        }
        buf.setNumber(NumberFormat.UInt16BE, 0, adr)
        for (let i = 0; i < n; i++) {
            buf.setNumber(NumberFormat.UInt8BE, i + 2, d[i])
        }
        pins.i2cWriteBuffer(i2cAddr | mbit, buf, false)
        basic.pause(5)
    }
    /**
     * Write Memory Byte
     * @param adr describe parameter here, eg: 0
     * @param b describe parameter here, eg: 0
    */
    //% blockId="EEPROM_WRITEB" block="writeb addr %adr|data %b"
    //% weight=80 blockGap=8
    export function writeb(adr: number, b: number): void {
        let d: number[] = [0]
        d[0] = b
        writen(adr, d, 1)
    }
    /**
     * Write Memory Word
     * @param adr describe parameter here, eg: 0
     * @param w describe parameter here, eg: 0
    */
    //% blockId="EEPROM_WRITEW" block="writew addr %adr|data %w"
    //% weight=80 blockGap=8
    export function writew(adr: number, w: number): void {
        let d: number[] = [0, 0]
        d[0] = w >> 8
        d[1] = w & 0xff
        writen(adr, d, 2)
    }
} 
