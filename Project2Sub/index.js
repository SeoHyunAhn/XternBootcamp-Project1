const app = {
    max: 0,
    init: function (selectors) {
        this.max = 0
        this.list = document.querySelector(selectors.listselector)
        document
            .querySelector(selectors.formselector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handelSubmit(ev)
            })
    },
    renderListItem(flick){
        const item = document.createElement('li')
        item.textContent = flick.name
        return item;
    },

    handelSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
        }
        const item = this.renderListItem(flick)
        this.list.appendChild(item)
        console.log(flick);
        f.reset()
    },

}
app.init({
    formselector: '#flickForm',
    listselector: '#flickList',
})