<script setup>
import { ref, onMounted, watch } from 'vue';
import Guitar from './components/Guitar.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { db } from './data/guitars';
const guitars = ref([]);
const cart = ref([]);
const guitar = ref({});

onMounted(() => {
    guitars.value = db;
    guitar.value = db[3];

    const cartStorage = localStorage.getItem('cart');
    if(cartStorage){
        cart.value = JSON.parse(cartStorage);
    }
});

watch(cart, () => {
    saveLocalstorage();
}, {
    deep: true
})

const saveLocalstorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
}

const addCart = (guitar) => {

    const existCart = cart.value.findIndex(product => product.id === guitar.id);

    if(existCart >= 0){
        cart.value[existCart].quantity++;
    }else{
        guitar.quantity = 1;
        cart.value.push(guitar);
    }

}

const decrementQuantity = (id) => {
    const indexProduct = cart.value.findIndex(product => product.id === id);

    if(cart.value[indexProduct].quantity <= 1) return;

    cart.value[indexProduct].quantity--;
}

const incrementQuantity  = (id) => {
    const indexProduct = cart.value.findIndex(product => product.id === id);
    cart.value[indexProduct].quantity++;
}

const deleteProduct = (id) => {
    cart.value = cart.value.filter( product => product.id !== id);
}

const emptyCart = () => {
    cart.value  = [];
}

</script>

<template>
    <Header
        :cart="cart"
        :guitar="guitar"
        @increment-quantity="incrementQuantity"
        @decrement-quantity="decrementQuantity"
        @add-cart="addCart"
        @delete-product="deleteProduct"
        @empty-cart="emptyCart"
    />
    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>

        <div class="row mt-5">
            <Guitar
            v-for="guitar in guitars"
            :guitar="guitar"
            :key="guitar.id"
            @add-cart="addCart"
            />
        </div>
    </main>
    <Footer/>
</template>
<style scoped>
</style>
