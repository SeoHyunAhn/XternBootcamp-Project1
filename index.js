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
        const namespan = item.querySelector('.flickName')
        namespan.textContent = flick.name
        namespan.addEventListener('keypress', this.saveOnEnter.bind(this, flick))
        item.querySelector('.remove.button').addEventListener('click', this.handledelete.bind(this, flick))
        item.querySelector('.fav.button').addEventListener('click', this.handlefav.bind(this, flick))
        item.querySelector('.edit.button').addEventListener('click', this.handleEdit.bind(this, flick))
        
        // item.querySelector('.button').addEventListener('click', (ev) => {
        //     ev.preventDefault()
        //     this.handlefav(ev)
        // })
        return item;
    }
    saveOnEnter(flick, ev){
        if (ev.key === 'Enter'){
            this.handleEdit(flick, ev)
        }
    }


    handleEdit(flick, ev) {
        const item = ev.target.closest('.flick')
        const btn = item.querySelector('.edit.button')
        const nameField = item.querySelector('.flickName')
        // nameField.contentEditable = !nameField.isContentEditable  << This works too!!
        if (nameField.isContentEditable){
            //make it no longer editable
            nameField.contentEditable = false
            btn.textContent = "edit"
            btn.classList.remove('success')
            flick.name = nameField.textContent
        }else {
            //make it editable
            nameField.contentEditable = true
            nameField.focus()
            btn.textContent = 'save'
            btn.classList.add('success')
        }

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

    handlefav(flick, ev) {
        const event = ev.target
        const li = event.closest('.flick')
        flick.fav = li.classList.toggle('fav')

        // const t = this.flicks.indexOf(flick)
        // if (this.flicks[t].fav == false ){
        //     this.flicks[t].fav = true
        //     li.style.background = "blue"
        // }else {
        //     this.flicks[t].fav = false
        //     li.style.background = "white"
        // }
        
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
