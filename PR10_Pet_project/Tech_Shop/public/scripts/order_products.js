window.onload = (event) => {
    fillProductsList();

};

function fillProductsList(){
    fetch('/api/products/')
        .then(res => {
            return res.json();
        })
        .then(data => {
            const container = document.getElementById('productsContainer');
            data.forEach(item => {
                const newLiItem = `<div class="list_items"><li> <input type="checkbox" class="select-item" data-id="${item.id}">
                        <em><input class="button update" type="button" id="${item.id}" value="Замовити" onclick="order_product(${item.id})"></em><span> Модель телефону:<b> ${item.model}</b> Версія: <b>${item.version} </b> ціна:<b> ${item.cost} <b style="color:slateblue">ЗАЛИШИЛОСЬ ТОВАРУ <b style="color:red">${item.amount}</b></b></b> </span> </li></div>`;
                container.insertAdjacentHTML('beforeend', newLiItem);
            })
            const button ='<div class="delete_check"><input class="button update" type="button" value="Замовити вибране" onclick="order_same_Product()"></div>'
            container.insertAdjacentHTML('beforeend', button);

        })
        .catch(error => {
            console.log(error);
            alert(error);
        });
}
function  order_product(id){
    fetch(`/api/products/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
             if(data.amount===0){
                 const button=document.querySelector(`[id="${data.id}"]`)
                 const element = document.querySelector(`[data-id="${data.id}"]`);

                    element.setAttribute('disabled', 'true');
                 button.value = "-"
                 alert("Немає в наявності")

            }
            else{
                document.location = "/";
        }

        })
        .catch(error => {
            console.log(error);
            alert(error);
        });
}
function order_same_Product() {
    const confirmResult = confirm("Ви хочете замовити ці продукти");
    if(!confirmResult){return;}
    const selectedItems = document.querySelectorAll('.select-item:checked');
    if (selectedItems.length === 0) {
        alert("Ви не обрали товари");
    }
    selectedItems.forEach(item => {
        const id = item.getAttribute('data-id');
        fetch(`/api/products/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
                    .then(() => {
                        document.location = "/";
                    })
            .catch(error => {
                console.log(error);
                alert(error);
            });

    });
    alert('Продукти замовленні')
}