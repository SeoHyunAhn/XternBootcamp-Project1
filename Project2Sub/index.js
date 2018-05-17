const app = {
    max: 0,
    init(selectors) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listselector)
        this.template = document.querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formselector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handelSubmit(ev)
            })
    },
    renderListItem(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item.querySelector('.flickName').textContent = flick.name
        return item;
    },

    handelSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
        }
        this.flicks.unshift(flick) //역순으로 어레이에 저장 그냥 push면 오는 족족 넣음

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstElementChild)
        console.log(flick);
        f.reset()
    },

}
app.init({
    formselector: '#flickForm',
    listselector: '#flickList',
    templateSelector: '.flick.template',
})