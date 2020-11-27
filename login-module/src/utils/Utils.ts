import bcrypt, { compare } from 'bcrypt';


export async function hashText(text: string) {
    let salt = await bcrypt.genSalt();
    return bcrypt.hash(text, salt);
}

export async function validateHash(text: string, hash: string) : Promise<boolean>{
    return bcrypt.compare(text, hash);
}