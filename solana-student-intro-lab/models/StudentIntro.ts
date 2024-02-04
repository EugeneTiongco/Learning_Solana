import * as borsh from '@coral-xyz/borsh'
import { ST } from 'next/dist/shared/lib/utils';
export class StudentIntro {
    name: string;
    message: string;

    constructor(name: string, message: string) {
        this.name = name;
        this.message = message;
    }

    borschInstructionsSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('name'),
        borsh.str('message'),
    ])

    static borschAccountSchema = borsh.struct([
        borsh.bool('initialized'),
        borsh.str('name'),
        borsh.str('message'),
    ])

    static deserialize(buffer?: Buffer): StudentIntro|null {
        if(!buffer) { return null }

        try {
            const { name, message } = this.borschAccountSchema.decode(buffer)
            return new StudentIntro(name, message)
        } catch (error) {
            console.log('Deserialize error:', error)
            return null
        }
    }

    serialize(): Buffer {
        const buffer = Buffer.alloc(1000)
        this.borschInstructionsSchema.encode({...this, variant: 0}, buffer)
        return buffer.slice(0, this.borschInstructionsSchema.getSpan(buffer))
    }

    static mocks: StudentIntro[] = [
        new StudentIntro('WEN', 'Hi my name is WEN'),
        new StudentIntro('JUP', 'Hi my name is JUP')
    ]
}