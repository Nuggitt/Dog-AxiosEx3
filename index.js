const baseurl = "https://dogrest20240609123407.azurewebsites.net/api/dogs";

Vue.createApp({
    data() {
        return {
            dogs: [],
            singleDog: null,
            addDogData: { name: "", age: 0 },
            addMessage: "",
            deleteId: 0,
            deleteMessage: "",
            filterDogs: [],
            name: null
        }
    },
    created() {
        if (baseurl) {
            this.getAll(baseurl);
        }
    },
    methods: {
        async getAll(url) {
            try {
                const response = await axios.get(url);
                this.dogs = await response.data;
                this.filterDogs = this.dogs;
                console.log(this.dogs);
            } catch (ex) {
                alert(ex.message);
            }
        },
        async getDog(id) {
            try {
                const response = await axios.get(`${baseurl}/${id}`);
                this.singleDog = response.data;
            } catch (ex) {
                alert(ex.message);
            }
        },
        async addDog() {
            // Perform client-side validation
            if (!this.addDogData.name || !this.addDogData.age) {
                alert("Please enter a valid name and age.");
                return; // Exit the function if data is not valid
            }

            try {
                const response = await axios.post(baseurl, this.addDogData);
                this.addMessage = `Response: ${response.status} ${response.statusText}`;
                this.getAll(baseurl);
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    alert("Bad Request: Please enter a valid name and age.");
                } else {
                    alert(ex.message);
                }
            }
        },
        async deleteDog(deleteId) {
            try {
                const response = await axios.delete(`${baseurl}/${deleteId}`);
                this.deleteMessage = `Response: ${response.status} ${response.statusText}`;
                this.getAll(baseurl);
            } catch (ex) {
                alert(ex.message);
            }
        },
        filterByName() {
            console.log("Name:" + this.name + ":")
            console.log("Dogs" + this.dogs)
            this.filterDogs = this.dogs.filter(b => b.name.toLowerCase().includes(this.name.toLowerCase()))
            console.log("filtered Dogs: " + this.filterDogs)
        },
        sortByNameAsc() {
            this.filterDogs.sort((dog1, dog2) =>
                dog1.name.localeCompare(dog2.name))
        },
        sortByNameDesc() {
            this.filterDogs.sort((dog1, dog2) =>
                dog2.name.localeCompare(dog1.name))
        },
        sortByAgeAsc() {
            this.filterDogs.sort((dog1, dog2) => dog1.age - dog2.age)
        },
        sortByAgeDesc() {
            this.filterDogs.sort((dog1, dog2) => dog2.age - dog1.age)
        },
    },

}).mount("#app");
