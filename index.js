

let container = document.querySelector("#allCountries")

let template = document.querySelector("#toDuplicate")


const loadAll = (filter = '') =>{
    fetch('./data.json')
        .then(response => response.json())
        .then(data =>{
            
            container.innerHTML = ''
                
            let searchThrough = data.filter(country=>{
                return(
                    country.name.toLowerCase().includes(filter.toLowerCase()) || country.region.toLowerCase().includes(filter.toLowerCase())
                )
            });

            searchThrough.forEach(country => {

                const repeat = template.cloneNode(true);
                repeat.style.display = 'block';
                

                repeat.querySelector("#flag").src = country.flags.svg
                repeat.querySelector("#country").textContent = country.name
                repeat.querySelector("#population").textContent = `${"Population: " + country.population}`
                repeat.querySelector("#region").textContent = `${"Region: " + country.region}`
                repeat.querySelector("#capital").textContent = `${"Capital: " + country.capital}`

                container.appendChild(repeat)

            });

        })
        .catch(error => console.error('Error', error))
};
loadAll();

document.querySelector('#enter').addEventListener('input', (search) => {
    let filtered = search.target.value;
    loadAll(filtered);
});



const loadAllClick = (filter = '') =>{
    fetch('./data.json')
        .then(response => response.json())
        .then(data =>{
            
            container.innerHTML = ''

            let tic;
                if (filter === 'All' || filter === '') {
                    tic = data
                } else {
                    tic = data.filter(country => country.region === filter)}

            tic.forEach(country => {

                const repeat = template.cloneNode(true);
                repeat.style.display = 'block';
                

                repeat.querySelector("#flag").src = country.flags.svg
                repeat.querySelector("#country").textContent = country.name
                repeat.querySelector("#population").textContent = `${"Population: " + country.population}`
                repeat.querySelector("#region").textContent = `${"Region: " + country.region}`
                repeat.querySelector("#capital").textContent = `${"Capital: " + country.capital}`

                container.appendChild(repeat)

            });

        })

        .catch(error => console.error('Error', error))
};
loadAllClick();

document.querySelectorAll('.filter').forEach(anchor =>{
    anchor.addEventListener('click', (find) =>{
        let finder = find.target.getAttribute('data-filter');
        loadAllClick(finder);
    });
}); 