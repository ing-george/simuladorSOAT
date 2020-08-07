new Vue({
    el: '#app',

    data() {
        return {
            runt: 1700,
            total: 0,
            categorias: [],
            tipo_vehiculo: [],
            selectedStatus: '',
            show_clase: false,
            show_total: false,
        }
    },

    mounted () {
        this.getCategories()
    },

    methods: {

        getCategories() { 
            axios
                .get('./data.JSON')
                .then(response => {
                    this.categorias = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },

        onChangeCategory(event) {
            let val = event.target.value
            this.tipo_vehiculo = this.categorias[val].info_categoria
            this.show_clase = true
            this.show_total = false
            this.selectedStatus = "";
        },

        onChangeClase(event) {
            let val = event.target.value
            let vehiculo = this.tipo_vehiculo[val]
            this.show_total = true

            this.tarifa = vehiculo.tarifa
            this.prima = vehiculo.prima
            this.contribucion = vehiculo.contribucion
            this.total = this.prima + this.runt + this.contribucion
            this.total = (new Intl.NumberFormat().format(this.total))
        }
    },
})