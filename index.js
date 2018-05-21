class App {
   constructor(selectors) {
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
    }
    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item.querySelector('.flickName').textContent = flick.name
        item.querySelector('.remove.button').addEventListener('click', this.handledelete.bind(this, flick))
        item.querySelector('.button').addEventListener('click', (ev) => {
            ev.preventDefault()
            this.handlefav(ev)
        })
        return item;
    }

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
    }

    handlefav(ev) {
        const t = ev.target
        const li = t.closest('.flick')
        li.style.background = "yellow"
        for(let i=0; i < this.flicks.length; i++){
            if(this.flicks[i].id.toString() == li.dataset.id){
                this.flicks[i].fav = true
            }
        }
        
    }

    handledelete(flick, e) {
        e.preventDefault();
        const btn = e.target
        const li = btn.closest('.flick')
        //Can use ev.target.parentNode.parentNode but it will break if not li
        //So we can use cloest(li) but as we have an id for li, we can write with flick
        // for(let i=0; i < this.flicks.length; i++){
        //     if(this.flicks[i].id.toString() == li.dataset.id){
        //         this.flicks.splice(i,1);
        //     }
        // }
        const t = this.flicks.indexOf(flick)
        this.flicks.splice(t,1);
        //loop through array 
        li.remove()
    }
}

const app = new App({
    formselector: '#flickForm',
    listselector: '#flickList',
    templateSelector: '.flick.template',
})
