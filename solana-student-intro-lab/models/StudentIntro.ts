import * as borsh from '@coral-xyz/borsh'
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