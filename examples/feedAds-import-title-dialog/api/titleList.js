/**
 * @file mock接口
 * @param params {object} 请求参数
 * @return {Promise}
 */
const listData = [
    {title: '标题标题abc1'},
    {title: 'hello标题abc2'},
    {title: 'title标题abc3'},
    {title: '创意标题abc4'}
];

module.exports = ({searchQuery = ''} = {}) => {
    return new Promise(resolve => {
        setTimeout(() => resolve({
            error: null,
            status: 200,
            data: {
                listData: listData.filter(item => !searchQuery || ~item.title.indexOf(searchQuery))
            }
        }), 200);
    });
};