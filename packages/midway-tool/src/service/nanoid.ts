import { Provide, Inject } from '@midwayjs/decorator';
import { nanoid, customAlphabet } from 'nanoid'

@Provide()
export class Nanoid {

    @Inject()
    ctx: any

    /**
     * 生成随机唯一id
     * @param length 生成id长度 default[21]
     */
    public id(length?: number) {
        if(!length) length = 21
        let id: string = nanoid(length)
        return id
    }

    /**
     * 指定范围生成
     * @param length 生成id长度 default[21]
     * ```ts
     * this.tool.setId(6)
     * ```
     * @param alphabet 用于生成id的字符串
     * ```ts
     * this.tool.setId(6, '123456abcdef') // AB2edf
     * ```
     */
    public setId(length?: number, alphabet?: string): string {
        if(!length) length = 21
        if(!alphabet) alphabet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const nanoid: any = customAlphabet(alphabet, length)
        return nanoid()
    }
}