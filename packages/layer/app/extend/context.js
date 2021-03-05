const context = {
    /**
     * 获取nginx代理层真实IP
     * @return 113.230.133.116
     */
    get getIP() {
        const ctx = this;
        return ctx.ips.length > 0 ? (ctx.ips[0] !== '127.0.0.1' ? ctx.ips[0] : ctx.ips[1]) : ctx.ip;
    },
    /**
     *  生成随机数函数
     *  randomWord(false, 位数[自己定义])  固定长度
     *  randomWord(true, 至少位数, 最大位数)  长度从多少到多少
     * @param randomFlag
     * @param min
     * @param max
     * @returns {string}
     */
    randomWord(randomFlag, min, max, key) {
        let str = "",
            pos = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        } else {
            //自定义key
            arr = max;
        }
        for (let i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    },
    /**
     * 时间戳签名
     * @returns {string}
     */
    get signKey() {
        const crypto = require('crypto');
        const moment = require('moment');
        const key = moment().unix();
        const rand = this.randomWord(true, 8, 16);
        const sign = crypto.createHash('md5').update(key + rand, 'utf8').digest('hex').toUpperCase();//签名

        return sign;
    },
    /**
     * jwt 格式化
     * @param {*} token 
     * @return 返回sub加密值与token格式化串
     */
    jwt(token) {
        let strStart = token.indexOf('.');
        let strEnd = token.indexOf('.', strStart + 1);
        let sub = token.substring(strStart + 1, strEnd);
        //查找密钥权限组
        if (sub) {
            sub = JSON.parse(Buffer(sub, 'base64').toString()).sub;
            sub = sub !== undefined ? sub : '';
        }
        //去除Bearer ' ' 检测是否存在Bearer 前缀
        if (token.indexOf('Bearer ') !== -1) {
            token = token.substring(token.indexOf(' ') + 1);
        }

        return {
            sub,
            token
        }
    },
    /**
     * 查询指定key 返回数组内index下标
     * @param {数组} arr 查询数组对象
     * @param {键} key 查询的键
     * @param {值} value 查询的值
     */
    async arrIndex(arr, key, value) {
        return arr.findIndex((data) => {
            return data[key] === value
        })
    },
    /**
     * 多条件查询数组对象 直接返回结果
     * @param {数组对象} arr 查询数组对象
     * @param {值} value { id: 22, name: 'lee' }
     */
    async arrFind(arr, value) {
        let result = arr.filter(item => {
            for(let key in value) {
                if(value.hasOwnProperty(key) && (item[key] !== value[key])) {
                    return false
                }
            }
            return true
        })
        return result
    },
    /**
     * 数组A和数组B合并 返回合并后数组
     * @param {原数组} thisArr 需要合并的数组A
     * @param {合并数组} argArr 被合并的数组B
     */
    async arrUnite(thisArr, argArr) {
        return thisArr.push.apply(thisArr, argArr)
    },
    /**
     * 数组数字排序
     * @param {*} arr 
     */
    ArrayRank(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = Number(arr[i])
            for (var j = i + 1; j < arr.length; j++) {
                arr[j] = Number(arr[j])
                if (arr[i] > arr[j]) {
                    var tmp = arr[i]
                    arr[i] = arr[j]
                    arr[j] = tmp
                }
            }
        }
        return arr
    },
    // 判断函数
    is: {
        /**
         * 判断是否为数字
         * @param {*} num 
         */
        Number(num) {
            return num === +num
        },
        /**
         * 判断是否为布尔值
         * @param {*} data 
         */
        Boolean(data) {
            return typeof data === 'boolean'
        },
        /**
         * 判断是否为字符串
         * @param {*} str 
         */
        String(str) {
            return typeof str === 'string'
        },
        /**
         * 判断是否为null
         * @param {*} data 
         */
        Null(data) {
            return data === null && typeof data === 'object'
        },
        /**
         * 判断是否为undefined
         * @param {*} data 
         */
        Undefined(data) {
            return typeof data === 'undefined'
        },
        /**
         * 判断是否为对象 （非数组）
         * @param {*} obj 
         */
        Object(obj) {
            return typeof obj === 'object' && !Array.isArray(obj)
        },
        /**
         * 判断是否为数组
         * @param {*} arr 
         */
        Array(arr) {
            return Array.isArray(arr)
        },
        /**
         * 判断是否为函数
         * @param {*} fn 
         */
        Function(fn) {
            return typeof fn === 'function'
        },
        /**
         * 判断是否为正确金额
         * console.log(is.Price('12.37')); // true
         * console.log(is.Price('12&37')); // false
         * @param {*} num 
         */
        Price(num) {
            let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
            return reg.test(value);
        },
        /**
         * 判断数组是否有重复值
         * @param arr 需要判断的数组
         * @param strict： 严格模式true，非严格false
         * @returns {boolean} ture: 有重复值  false: 没有重复值
         */
        ArrayRepeat(arr, strict = false) {
            var hash = {};
            for (var i in arr) {
                if (strict === true) {
                    if (hash[arr[i]] && hash[arr[i]] === arr[i]) {
                        return true;
                    }
                    hash[arr[i]] = arr[i];
                } else {
                    if (hash[arr[i]]) {
                        return true;
                    }
                    hash[arr[i]] = true;
                }
            }
            return false;
        }
    },
    // 数组操作
    array: {
        /**
         * 数组去重
         * @param {*} arr 
         */
        Unique(arr) {
            let hash = [];
            for (let i = 0; i < arr.length; i++) {
                if (hash.indexOf(arr[i]) === -1) {
                    hash.push(arr[i]);
                }
            }
            return hash;
        },

    }
}

module.exports = context