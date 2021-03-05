import { Provide, Inject } from '@midwayjs/decorator';

@Provide()
export class Tool {

    @Inject()
    ctx: any

    /**
     * 获取class类名称&转换为小写
     * @param entity Class实体
     */
    public parseClassName(entity: any) {
        let className: string = entity.toString()
        className = className.substr('class '.length)
        className = className.replace(/\s+/g, "")
        return className.substr(0, className.indexOf('{')).toLowerCase()
    }

    /**
     * 打印函数名称
     * @param fn 
     */
    public parseFunctionName(fn: Function) {
        return (console.debug(fn.name), fn);
    }

    /**
     * 获取URL上的参数
     * @param param 参数名
     */
    public getUrlParam(param: string) {
        const result = window.location.href.match(new RegExp('(\\?|&)' + param + '(\\[\\])?=([^&#]*)'))
        return result ? result[3] : undefined
    }

    /**
     * 保留两位小数 同时不四舍五入
     * @param number 
     * @param num 
     */
    public toFixedNum(number, num) {
        const type = typeof (number);
        let number_arr = [];
        if (type === 'number') {
            const str = number.toString();
            number_arr = str.split('.');
        } else if (type === 'string') {
            number_arr = number.split('.');
        }
        if (number_arr.length > 1) {
            number = number_arr[0] + '.' + number_arr[1].substr(0, num);
        }
        return parseFloat(number);
    }

    /**
     * 判断是否为null或者undefined
     * @param data 
     */
    public isNullData(data: any) {
        if (data === '' || data === null || data === undefined || data === 'undefined') {
            return true
        } else {
            return false
        }
    }

    /**
     * 判断是否是 Float 浮点
     * @param num 
     */
    public isFloat(num) {
        return num !== parseInt(num);
    }

    /**
     * 判断是否为数字
     * @param n 
     */
    public isNumber(n: any) {
        return n === +n
    }

    /**
     * 判断是否为数组
     * @param obj 
     */
    public isArray(obj: any) {
        return Array.isArray(obj)
    }

    /**
     * 移除数组中的假值
     * @param arr 
     */
    public compact(arr: Array<any>) {
        return arr.filter(Boolean);
    }

    /**
     * 将数字转为数字数组 (移除符号 - )
     * @param n 
     */
    public digitize(n: number) {
        return [...`${Math.abs(n)}`].map(i => parseInt(i));
    }

    /**
     * 检查是否给定的字符串中有空格
     * @param str 
     */
    public containsWhitespace(str: string): boolean {
        return /\s/.test(str);
    }

    /**
     * 压缩字符串中的空白 (多个空格转换为单个空格)
     * @param str 
     */
    public compactWhitespace(str: string) {
        return str.replace(/\s{2,}/g, ' ');
    }

    /**
     * 如果提供的值不是数组 则将它转为数组
     * @param val 
     */
    public castArray(val: any) {
        return (Array.isArray(val) ? val : [val]);
    }

    /**
     * 对数组中的对象进行排序
     * @param key 
     * @param desc 
     * const arr = [{"id":2,"name":"2"},{"id":1,"name":"1"}]
     * arr.sort(keysort('name', 'desc'));
     */
    public keysort(key, desc) {
        return function (a, b) {
            return desc ? (a[key] < b[key]) : (a[key] > b[key]);
        };
    }

    /**
     * 返回字节单位字符串长度
     * @param str 
     */
    public byteSize(str: string) {
        return new Blob([str]).size;
    }

    /**
     * 编码 base-64 的ASCII字符串
     * @param str 
     */
    public encryptBase64(str: string) {
        return Buffer.from(str, 'binary').toString('base64');
    }

    /**
     * 解码用 base-64 编码的字符串数据
     * @param str 
     */
    public decryptBase64(str: string) {
        return Buffer.from(str, 'base64').toString('binary');
    }

    /**
     * 半角转换为全角函数
     * @param str 
     */
    public ToDBC(str: any) {
        var result = '';
        for (var i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code >= 33 && code <= 126) {
                result += String.fromCharCode(str.charCodeAt(i) + 65248);
            } else if (code == 32) {
                result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
            } else {
                result += str.charAt(i);
            }
        }
        return result;
    }

    /**
     * 全角转换为半角函数
     * @param str 
     */
    public ToCDB(str: any) {
        var result = '';
        for (var i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code >= 65281 && code <= 65374) {
                result += String.fromCharCode(str.charCodeAt(i) - 65248);
            } else if (code == 12288) {
                result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
            } else {
                result += str.charAt(i);
            }
        }
        return result;
    }

    
}