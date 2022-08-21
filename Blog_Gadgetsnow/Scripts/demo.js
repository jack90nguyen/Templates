
var loadDataDemo = () => {
    var listRepeat = $('[data-repeat]');
    for (let i = 0; i < listRepeat.length; i++) {
        var element = listRepeat[i];

        let rows = element.dataset.rows;
        let template = element.innerHTML;
        let strContent = '';
        for (let j = 1; j <= rows; j++) {
            let img = `/Images/Demo/${Math.floor((Math.random() * 6) + 1)}.jpg`;
            strContent += template.replace(/#id/g, j).replace('#img', img);
        }

        element.innerHTML = strContent;
    }


    loadAfterDataDemo();
}