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
    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item.querySelector('.flickName').textContent = flick.name
        item.querySelector('.alert').addEventListener('click', (ev) => {
            ev.preventDefault()
            this.handledelete(ev)
        })
        item.querySelector('.button').addEventListener('click', (ev) => {
            ev.preventDefault()
            this.handlefav(ev)
        })
        return item;
    },

    handelSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
            fav: false,
        }
        this.flicks.unshift(flick) //역순으로 어레이에 저장 그냥 push면 오는 족족 넣음

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstElementChild)
        console.log(flick);
        f.reset()
    },

    handlefav(ev) {
        const t = ev.target
        const li = t.closest('.flick')
        li.style.background = "yellow"
        for(let i=0; i < this.flicks.length; i++){
            if(this.flicks[i].id.toString() == li.dataset.id){
                this.flicks[i].fav = true
            }
        }
        
    },

    handledelete(e) {
        e.preventDefault();
        const btn = e.target
        const li = btn.closest('.flick')
        for(let i=0; i < this.flicks.length; i++){
            if(this.flicks[i].id.toString() == li.dataset.id){
                this.flicks.splice(i,1);
            }
        }
        li.remove()
    },
}
app.init({
    formselector: '#flickForm',
    listselector: '#flickList',
    templateSelector: '.flick.template',
})

// $('ul').on('click', 'button', function(e) {

    // let tempName = $(this).closest('li').eq(0).html();
    // $(this).closest('li').remove();
    // console.log(tempName);
    // let index = globalArr.indexOf(tempName);
    // globalArr.splice(index, 1);
//   });
