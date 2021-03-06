/**
 * Region 工具集
 * @author Brian Li
 * @email lbxxlht@163.com
 * @author 0.0.2.1
 */
define(function (require) {
    // 祖先关系
    var ancestors = {
        '1':'990','2':'992','3':'990','4':'994','5':'992','7':'999','8':'994','9':'992','10':'995','11':'996',
        '12':'994','13':'990','14':'993','15':'991','16':'993','17':'993','18':'991','19':'992','20':'992',
        '21':'991','22':'990','23':'996','24':'996','25':'992','26':'990','27':'996','28':'995','29':'995',
        '30':'996','31':'995','32':'992','33':'995','34':'997','35':'997','36':'997','37':'999','38':'18',
        '39':'18','40':'18','41':'18','42':'18','43':'18','44':'18','45':'18','47':'18','48':'5','49':'5',
        '50':'5','51':'5','52':'5','53':'19','54':'19','55':'19','56':'19','57':'19','58':'19','59':'19',
        '60':'19','61':'19','62':'19','63':'19','64':'19','65':'19','66':'5','67':'20','68':'20','69':'20',
        '70':'5','71':'20','72':'20','73':'20','74':'20','75':'20','76':'20','77':'20','78':'20','80':'5',
        '81':'5','82':'4','83':'4','84':'4','85':'4','86':'4','88':'4','89':'4','90':'4','91':'4','92':'4',
        '93':'4','94':'4','95':'12','96':'12','98':'12','99':'12','100':'12','101':'12','102':'12','103':'12',
        '104':'12','105':'12','106':'12','107':'12','108':'12','109':'4','110':'4','111':'4','112':'4','113':'4',
        '114':'4','115':'4','116':'4','117':'4','118':'10','119':'10','120':'10','121':'10','122':'10','123':'10',
        '124':'10','125':'10','126':'10','127':'9','128':'9','129':'9','130':'9','131':'9','132':'9','133':'9',
        '134':'9','135':'9','136':'9','137':'9','138':'9','139':'9','140':'9','141':'9','142':'9','143':'9',
        '144':'21','145':'21','146':'21','147':'21','148':'21','149':'21','150':'21','151':'21','152':'21',
        '153':'21','154':'21','155':'21','156':'21','157':'21','158':'22','159':'22','160':'22','161':'22',
        '162':'22','163':'22','164':'22','165':'22','166':'22','167':'22','168':'22','169':'22','170':'23',
        '171':'23','172':'23','173':'23','174':'23','175':'24','176':'24','177':'24','178':'24','179':'30',
        '180':'30','181':'30','182':'30','183':'30','184':'30','185':'30','186':'30','187':'30','188':'30',
        '189':'30','190':'30','191':'30','192':'30','193':'30','195':'30','196':'25','197':'25','198':'25',
        '199':'25','200':'25','201':'25','202':'25','203':'25','204':'25','205':'26','206':'26','207':'25',
        '208':'25','209':'26','210':'26','211':'26','212':'26','213':'26','214':'26','215':'26','216':'26',
        '217':'26','218':'25','219':'25','220':'25','221':'25','222':'25','223':'25','224':'28','225':'28',
        '226':'28','227':'28','228':'28','229':'28','230':'28','231':'28','232':'28','233':'28','234':'28',
        '235':'28','236':'28','237':'28','238':'28','239':'27','240':'27','241':'27','242':'27','243':'27',
        '244':'27','245':'27','246':'27','247':'28','248':'27','249':'27','250':'28','251':'28','252':'28',
        '253':'28','254':'28','255':'11','256':'11','257':'11','258':'11','259':'11','260':'11','261':'11',
        '262':'11','263':'11','264':'11','265':'11','266':'11','267':'11','268':'29','269':'29','270':'29',
        '271':'29','272':'32','273':'32','274':'32','275':'32','276':'32','277':'32','278':'32','279':'32',
        '280':'32','281':'32','282':'32','283':'31','284':'31','285':'31','286':'31','287':'31','288':'31',
        '289':'31','290':'31','291':'31','292':'31','293':'31','294':'31','295':'31','296':'8','297':'8',
        '298':'8','299':'8','300':'8','301':'8','302':'8','303':'8','304':'13','305':'13','306':'13','307':'13',
        '308':'14','309':'14','310':'14','311':'14','312':'14','313':'14','314':'14','315':'14','316':'14',
        '317':'14','318':'14','319':'14','320':'14','321':'14','322':'14','323':'14','324':'14','325':'13',
        '326':'13','327':'13','329':'13','330':'13','331':'13','332':'13','333':'15','334':'15','335':'15',
        '336':'15','337':'15','338':'15','339':'15','340':'15','341':'15','342':'15','343':'15','344':'15',
        '345':'15','346':'16','347':'16','348':'16','349':'16','350':'17','351':'17','352':'17','353':'17',
        '354':'17','355':'17','356':'17','357':'17','358':'17','359':'17','360':'17','361':'17','362':'17',
        '363':'17','364':'16','365':'16','366':'16','367':'16','368':'16','369':'16','370':'16','371':'16',
        '372':'16','373':'16','375':'16','376':'16','377':'16','476':'14','477':'11','478':'12','479':'24',
        '480':'29','481':'31','482':'31','483':'31','484':'8','485':'8','486':'8','487':'8','488':'8','489':'8',
        '490':'8','491':'8','492':'8','493':'8','494':'24','495':'24','496':'24','497':'29','498':'29','499':'30',
        '500':'30','990':'998','991':'998','992':'998','993':'998','994':'998','995':'998','996':'998','997':'998'
    };
    // 孩子关系
    var filiation = {
        '13': [327, 304, 305, 306, 330, 332, 307, 325, 329, 326, 331],
        '26': [214, 209, 217, 205, 206, 211, 210, 213, 212, 215, 216],
        '22': [167, 159, 162, 169, 158, 168, 166, 161, 164, 163, 165, 160],
        '990': [1, 3, 13, 26, 22],
        '21': [153, 151, 145, 147, 155, 144, 152, 150, 157, 146, 148, 149, 154, 156],
        '18': [40, 39, 42, 38, 41, 43, 44, 45, 47],
        '15': [335, 342, 343, 344, 345, 333, 334, 336, 337, 338, 340, 339, 341],
        '991': [21, 18, 15],
        '19': [55, 54, 53, 57, 56, 60, 59, 61, 62, 58, 63, 64, 65],
        '32': [280, 282, 273, 272, 275, 276, 274, 277, 279, 278, 281],
        '9': [142, 128, 141, 143, 129, 130, 131, 140, 127, 133, 132, 135, 134, 137, 138, 139, 136],
        '5': [81, 50, 49, 51, 48, 52, 66, 70, 80],
        '20': [72, 78, 77, 68, 69, 67, 71, 74, 73, 75, 76],
        '25': [196, 223, 200, 220, 222, 197, 198, 199, 201, 202, 203, 208, 204, 218, 219, 221, 207],
        '992': [2, 19, 32, 9, 5, 20, 25],
        '14': [322, 309, 323, 476, 308, 310, 312, 311, 315, 313, 316, 321, 320, 317, 318, 319, 324, 314],
        '16': [371, 377, 366, 349, 348, 346, 347, 364, 368, 369, 367, 373, 375, 372, 370, 365, 376],
        '17': [352, 351, 353, 360, 350, 354, 355, 356, 357, 359, 362, 361, 358, 363],
        '993': [14, 16, 17],
        '4': [84, 85, 116, 90, 115, 117, 82, 83, 86, 88, 89, 91, 92, 94, 93, 109, 111, 110, 114, 112, 113],
        '8': [302, 493, 488, 492, 487, 303, 484, 296, 490, 491, 486, 297, 489, 298, 485, 301, 299, 300],
        '12': [99, 108, 104, 478, 98, 96, 95, 106, 107, 100, 101, 102, 103, 105],
        '994': [4, 8, 12],
        '28': [226, 252, 247, 250, 232, 236, 224, 225, 233, 228, 234,
                227, 229, 231, 235, 230, 237, 251, 254, 253, 238],
        '10': [118, 119, 124, 120, 122, 121, 123, 125, 126],
        '31': [284, 289, 283, 292, 286, 482, 293, 285, 287, 481, 290, 288, 291, 483, 295, 294],
        '29': [269, 498, 480, 270, 268, 271, 497],
        '995': [33, 28, 10, 31, 29],
        '27': [244, 240, 239, 248, 241, 242, 243, 245, 246, 249],
        '11': [258, 267, 263, 477, 257, 256, 255, 261, 259, 260, 262, 265, 264, 266],
        '24': [175, 496, 494, 176, 479, 177, 495, 178],
        '23': [174, 170, 171, 172, 173],
        '30': [192, 185, 499, 182, 191, 180, 181, 179, 195, 183, 184, 186, 187, 188, 500, 190, 189, 193],
        '996': [27, 11, 24, 23, 30],
        '997': [34, 36, 35],
        '998': [990, 991, 992, 993, 994, 995, 996, 997],
        '999': [7, 37]
    };
    // 一级地区字典序列
    var regionAlphabetOrder = {
        a: [9, 36],
        b: [1],
        c: [33],
        d: [],
        e: [],
        f: [5],
        g: [4, 12, 10, 11],
        h: [8, 14, 15, 16, 17, 13],
        i: [],
        j: [19, 20, 18],
        k: [],
        l: [21],
        m: [],
        n: [23, 22],
        o: [],
        p: [],
        q: [24],
        r: [],
        s: [2, 25, 26, 27, 28],
        t: [3, 35],
        u: [],
        v: [],
        w: [],
        x: [34, 30, 29],
        y: [31],
        z: [32]
    };
    return {

        ancestors: ancestors,

        filiation: filiation,

        regionAlphabetOrder: regionAlphabetOrder,

        /**
         * 获取地区的选中状态
         * @interface getSelectedState
         * @param {Number} id 地区编号
         * @param {Object} value 选中地区的hash
         * @param {Boolean} noLinkage 是否禁止子孙联动查找
         * @return {RegionSelectState} 地区选中状态
         */
        /**
         * @structure RegionSelectState
         * @param {Boolean} checked 该地区是否被选中
         * @param {Boolean} indeterminate 该地区是否出去半选状态
         * @param {Number} selected 该地区子树上选中的节点个数
         * @param {Number} total 该地区子树上所有节点个数
         */
        getSelectedState: function (id, value, noLinkage) {
            var result = {
                checked: false,
                indeterminate: false,
                selected: 0,
                total: 0
            };
            findChildren(filiation[id]);
            if (noLinkage) {
                result.checked = value[id];
            }
            else {
                result.checked = value[id] || (result.selected === result.total && result.total > 0);
                result.indeterminate = result.selected > 0 && !result.checked;
            }
            return result;
            function findChildren(arr) {
                if (!arr || arr.length === 0) return;
                for (var i = 0; i < arr.length; i++) {
                    var key = arr[i];
                    result.total += 1;
                    result.selected += value[key] === true ? 1 : 0;
                    findChildren(filiation[key]);
                }
            }
        },

        /**
         * 指针方法，将提取添加到选中hash中
         * @interface addValue
         * @param {Number} key 地区编号
         * @param {Object} value 选中地区的hash
         * @param {Boolean} noLinkage 是否禁止子孙联动添加
         */
        addValue: function (key, value, noLinkage) {
            var me = this;
            // 添加当前
            value[key] = true;
            if (noLinkage) {
                return;
            }
            // 添加子孙
            addChildren(filiation[key]);
            // 添加祖先
            addParent(key);
            function addParent(id) {
                while (ancestors.hasOwnProperty(id)) {
                    id = ancestors[id];
                    var selected = me.getSelectedState(id, value);
                    if (selected.selected === selected.total && selected.total !== 0) {
                        value[id] = true;
                    }
                }
            }
            function addChildren(arr) {
                if (!arr || !arr.length) return;
                for (var i = 0; i < arr.length; i++) {
                    value[arr[i]] = true;
                    addChildren(filiation[arr[i]]);
                }
            }
        },

        /**
         * 指针方法，从选中hash中删除地区
         * @interface deleteValue
         * @param {Number} key 地区编号
         * @param {Object} value 选中地区的hash
         * @param {Boolean} noLinkage 是否禁止子孙和祖先联动删除
         */
        deleteValue: function (key, value, noLinkage) {
            // 删除当前
            delete value[key];
            if (noLinkage) {
                return;
            }
            // 删除子孙;
            deleteChildren(filiation[key]);
            // 删除祖先
            deleteParent(key);
            function deleteParent(id) {
                while (ancestors.hasOwnProperty(id)) {
                    id = ancestors[id];
                    delete value[id];
                }
            }
            function deleteChildren(arr) {
                if (!arr || !arr.length) return;
                for (var i = 0; i < arr.length; i++) {
                    delete value[arr[i]];
                    deleteChildren(filiation[arr[i]]);
                }
            }
        },

        /**
         * 指针方法，删除选中hash中所有地区
         * @interface clearValue
         * @param {Object} value 选中地区的hash
         */
        clearValue: function (value) {
            for (var key in value) {
                if (value.hasOwnProperty(key)) delete value[key];
            }
        },

        /**
         * 将字符串类型的选中值转成hash
         * @interface parseValue
         * @param {String} value 选中地区串，以','分隔地区编号
         * @return {Object}
         */
        parseValue: function (value) {
            if (typeof value !== 'string') return {};
            var result = {};
            value = value.split(',');
            for (var i = 0; i < value.length; i++) {
                if (value[i].length === 0) continue;
                result[value[i]] = true;
            }
            return result;
        },

        /**
         * 将地区选中hash转成字符串
         * @interface stringifyValue
         * @param {Object} 地区选中hash，以地区编号为key
         * @return {String} 选中地区串，以','分隔地区编号
         */ 
        stringifyValue: function (value) {
            var result = [];
            for (var key in value) {
                if (value.hasOwnProperty(key)) result.push(key);
            }
            result.sort();
            return result.join(',');
        }

    };


});
