
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// PrimeVue Core
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import Tooltip from 'primevue/tooltip'

// Styles
import './assets/styles.scss'

//Componentes
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
import Menubar from 'primevue/menubar';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.component('ButtonVue', Button);
app.component('DataTableVue', DataTable);
app.component('ColumnVue', Column);
app.component('SkeletonVue', Skeleton);
app.component('MenubarVue', Menubar);
app.component('TagVue', Tag);
app.component('InputTextVue', InputText);
app.component('IconFieldVue', IconField);
app.component('InputIconVue', InputIcon);
app.component('DialogVue', Dialog);
app.component('TextareaVue', Textarea);
app.component('SelectVue', Select);
app.component('InputNumberVue', InputNumber);
app.component('ToastVue', Toast)


// Usar plugins
app.use(PrimeVue, {
theme: {
    preset: Aura,
    options: {
    darkModeSelector: 'none'
    }
},
locale: {
    startsWith: "Empieza con",
    contains: "Contiene",
    notContains: "No contiene",
    endsWith: "Termina con",
    equals: "Igual a",
    notEquals: "Diferente de",
    noFilter: "Sin filtro",
    lt: "Menor que",
    lte: "Menor o igual que",
    gt: "Mayor que",
    gte: "Mayor o igual que",
    dateIs: "Fecha igual",
    dateIsNot: "Fecha diferente",
    dateBefore: "Fecha antes de",
    dateAfter: "Fecha después de",
    clear: "Limpiar",
    apply: "Aplicar",
    matchAll: "Coincidir con todos",
    matchAny: "Coincidir con alguno",
    addRule: "Agregar regla",
    removeRule: "Eliminar regla",
    accept: "Aceptar",
    reject: "Rechazar",
    choose: "Elegir",
    upload: "Subir",
    cancel: "Cancelar",
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: "Hoy",
    weekHeader: "Sem",
    firstDayOfWeek: 1,
    dateFormat: "dd/mm/yy",
    weak: "Débil",
    medium: "Medio",
    strong: "Fuerte",
    passwordPrompt: "Introduce una contraseña"
}
})
.use(ToastService)

app.mount('#app')
