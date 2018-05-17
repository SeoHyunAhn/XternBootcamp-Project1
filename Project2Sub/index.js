const app = {
    max: 0,
    init: function (formselector) {
        this.max = 0

        document
            .querySelector(formselector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handelSubmit(ev)
            })
    },

    handelSubmit: function (ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
        }
        console.log(flick);
        f.reset()
    },

}
app.init('#flickForm')