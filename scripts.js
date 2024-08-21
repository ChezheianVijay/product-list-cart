document.addEventListener('DOMContentLoaded', () => {
    const data = [
        {
            "image": {
                "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
                "mobile": "./assets/images/image-waffle-mobile.jpg",
                "tablet": "./assets/images/image-waffle-tablet.jpg",
                "desktop": "./assets/images/image-waffle-desktop.jpg"
            },
            "name": "Waffle with Berries",
            "category": "Waffle",
            "price": 6.50
        },
        {
            "image": {
                "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
                "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
                "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
                "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
            },
            "name": "Vanilla Bean Crème Brûlée",
            "category": "Crème Brûlée",
            "price": 7.00
        },
        {
            "image": {
                "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
                "mobile": "./assets/images/image-macaron-mobile.jpg",
                "tablet": "./assets/images/image-macaron-tablet.jpg",
                "desktop": "./assets/images/image-macaron-desktop.jpg"
            },
            "name": "Macaron Mix of Five",
            "category": "Macaron",
            "price": 8.00
        },
        {
            "image": {
                "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
                "mobile": "./assets/images/image-tiramisu-mobile.jpg",
                "tablet": "./assets/images/image-tiramisu-tablet.jpg",
                "desktop": "./assets/images/image-tiramisu-desktop.jpg"
            },
            "name": "Classic Tiramisu",
            "category": "Tiramisu",
            "price": 5.50
        },
        {
            "image": {
                "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
                "mobile": "./assets/images/image-baklava-mobile.jpg",
                "tablet": "./assets/images/image-baklava-tablet.jpg",
                "desktop": "./assets/images/image-baklava-desktop.jpg"
            },
            "name": "Pistachio Baklava",
            "category": "Baklava",
            "price": 4.00
        },
        {
            "image": {
                "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
                "mobile": "./assets/images/image-meringue-mobile.jpg",
                "tablet": "./assets/images/image-meringue-tablet.jpg",
                "desktop": "./assets/images/image-meringue-desktop.jpg"
            },
            "name": "Lemon Meringue Pie",
            "category": "Pie",
            "price": 5.00
        },
        {
            "image": {
                "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
                "mobile": "./assets/images/image-cake-mobile.jpg",
                "tablet": "./assets/images/image-cake-tablet.jpg",
                "desktop": "./assets/images/image-cake-desktop.jpg"
            },
            "name": "Red Velvet Cake",
            "category": "Cake",
            "price": 4.50
        },
        {
            "image": {
                "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
                "mobile": "./assets/images/image-brownie-mobile.jpg",
                "tablet": "./assets/images/image-brownie-tablet.jpg",
                "desktop": "./assets/images/image-brownie-desktop.jpg"
            },
            "name": "Salted Caramel Brownie",
            "category": "Brownie",
            "price": 4.50
        },
        {
            "image": {
                "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
                "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
                "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
                "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
            },
            "name": "Vanilla Panna Cotta",
            "category": "Panna Cotta",
            "price": 6.50
        }
    ]

    const gridbox = document.getElementById('gridbox');
    let selectedItems = {};

    // Create and append grid items
    data.forEach((item) => {
        const griditems = document.createElement('div');
        griditems.classList.add('grid-items');

        const gridimg = document.createElement('img');
        gridimg.classList.add('grid-img');
        gridimg.src = item.image.desktop;
        gridimg.alt = item.name;
        griditems.appendChild(gridimg);

        const gridadd = document.createElement('div');
        gridadd.classList.add('grid-add');
        gridadd.innerHTML = `<img class="igcart" src="./assets/images/icon-add-to-cart.svg" alt="" />
      <h3 class="gadd-text">Add to cart</h3>`;
        griditems.appendChild(gridadd);

        const gridqty = document.createElement('div');
        gridqty.classList.add('grid-qty');
        gridqty.innerHTML = `<button class="minusbtn">
        <img class="plusimg" src="./assets/images/icon-decrement-quantity.svg" alt="" />
      </button>
      <p class="grid-add-text">0</p>
      <button class="plusbtn">
        <img class="minusimg" src="./assets/images/icon-increment-quantity.svg" alt="" />
      </button>`;
        griditems.appendChild(gridqty);

        const gcate = document.createElement('p');
        gcate.classList.add('grid-category');
        gcate.textContent = item.category;
        griditems.appendChild(gcate);

        const gnme = document.createElement('h3');
        gnme.classList.add('grid-name');
        gnme.textContent = item.name;
        griditems.appendChild(gnme);

        const gprice = document.createElement('h6');
        gprice.classList.add('grid-price');
        gprice.textContent = `$${item.price.toFixed(2)}`;
        griditems.appendChild(gprice);

        let quantity = 0;

        function qtyselector(newqty) {
            quantity = newqty;
            gridqty.querySelector('.grid-add-text').textContent = quantity;
            if (quantity > 0) {
                griditems.classList.add('active');
            } else {
                griditems.classList.remove('active');
            }
        }

        gridqty.querySelector('.plusbtn').addEventListener('click', () => {
            const newQuantity = quantity + 1;
            qtyselector(newQuantity);
            updateSelectedItems(item.name, item.category, item.price, newQuantity);
        });

        gridqty.querySelector('.minusbtn').addEventListener('click', () => {
            if (quantity > 0) {
                const newQuantity = quantity - 1;
                qtyselector(newQuantity);
                updateSelectedItems(item.name, item.category, item.price, newQuantity);
            }
        });

        gridbox.appendChild(griditems);
    });

    const empty = document.getElementById('empty');
    const items = document.getElementById('items');
    const myitems = document.getElementById('myitems');

    // Function to update display
    function updateDisplay() {
        let totalQuantity = 0;
        let totalPrice = 0;

        // Clear the myitems div before repopulating it
        // myitems.innerHTML = '';

        // Update the myitems div
        Object.keys(selectedItems).forEach(name => {
            const item = selectedItems[name];
            const { category, price, quantity } = item;

            if (quantity > 0) {
                // Check if item already exists in the cart
                let itemname = myitems.querySelector(`.itemname[data-name="${name}"]`);

                if (!itemname) {
                    // Create and append new item if it doesn't exist
                    itemname = document.createElement('div');
                    itemname.classList.add('itemname');
                    itemname.dataset.name = name;
                    myitems.appendChild(itemname);

                    const idesc = document.createElement('div');
                    idesc.classList.add('idescription');
                    itemname.appendChild(idesc);

                    const inme = document.createElement('h6');
                    inme.classList.add('iname');
                    idesc.appendChild(inme);

                    const mrpbox = document.createElement('div');
                    mrpbox.classList.add('mrpbox');
                    idesc.appendChild(mrpbox);

                    const qty = document.createElement('b');
                    qty.classList.add('qty');
                    mrpbox.appendChild(qty);

                    const priceElem = document.createElement('p');
                    priceElem.classList.add('price');
                    mrpbox.appendChild(priceElem);

                    const qtyprice = document.createElement('p');
                    qtyprice.classList.add('qtyprice');
                    mrpbox.appendChild(qtyprice);

                    // Add event listener for remove button
                    remove.addEventListener('click', () => {
                        console.log('Remove button clicked for:', name); // Debug line
                        delete selectedItems[name];
                        console.log('after delete Selected Items:', selectedItems); // Debug line
                        updateDisplay();
                        // Reset the quantity in the grid
                        const gridItem = Array.from(gridbox.querySelectorAll('.grid-items')).find(item => item.querySelector('.grid-name').textContent === name);
                        if (gridItem) {
                            gridItem.querySelector('.grid-add-text').textContent = 0;
                            gridItem.classList.remove('active');
                        }
                    });
                }

                // Update the item details
                itemname.querySelector('.iname').textContent = name;
                itemname.querySelector('.qty').textContent = `x${quantity}`;
                itemname.querySelector('.price').textContent = `$${price.toFixed(2)}`;
                itemname.querySelector('.qtyprice').textContent = `$${(quantity * price).toFixed(2)}`;

                totalQuantity += quantity;
                totalPrice += quantity * price;
            }
        });

        // Handle static elements in items
        if (totalQuantity > 0) {
            empty.style.display = 'none';
            items.style.display = 'flex';
            myitems.style.display = 'flex'; // Ensure myitems is visible

            // Update existing totalprice
            const totalprice = items.querySelector('.totalprice .value');
            if (totalprice) {
                totalprice.textContent = `$${totalPrice.toFixed(2)}`;
            }

        } else {
            empty.style.display = 'flex';
            items.style.display = 'none';
            myitems.style.display = 'none'; // Ensure myitems is hidden if no items
        }
    }

    myitems.addEventListener('click', (event) => {
        if (event.target.closest('.remove')) {
            const itemname = event.target.closest('.itemname');
            const name = itemname.dataset.name;
            delete selectedItems[name];
            updateDisplay();
            // Reset the quantity in the grid
            const gridItem = Array.from(gridbox.querySelectorAll('.grid-items')).find(item => item.querySelector('.grid-name').textContent === name);
            if (gridItem) {
                gridItem.querySelector('.grid-add-text').textContent = 0;
                gridItem.classList.remove('active');
            }
        }
    });

    function updateSelectedItems(name, category, price, quantity) {
        if (quantity > 0) {
            selectedItems[name] = { category, price, quantity };
            console.log('Selected Items:', selectedItems);
        } else {
            delete selectedItems[name];
        }
        updateDisplay();
    }

});

document.querySelector('.confirm').addEventListener('click', () => {
    const mymodal = document.getElementById('mymodal');
    mymodal.style.display = 'flex';



    // Get the number of .itemname elements
    const itemNames = document.querySelectorAll('#myitems .itemname');
    const numberOfItems = itemNames.length;

    // Get the value of .value element
    const orderTotal = document.querySelector('#items .totalprice .value').textContent;

    // Initialize an array to hold item details
    const itemDetails = [];

    // Iterate through each .itemname element and extract details
    itemNames.forEach(item => {

        const name = item.querySelector('.iname').textContent;
        const qty = item.querySelector('.qty').textContent;
        const actprice = item.querySelector('.price').textContent;

        // Push the details into the array
        itemDetails.push({
            name: name,
            qty: qty,
            price: actprice,
            qtyprice: qty * actprice
        });
    });

    // Create the modal content
    // const totalboxes = document.getElementById('totalboxes');
    // Clear previous modal content
    // modalContent.innerHTML = '';

    console.log('Item details:', itemDetails);

    itemDetails.forEach(detail => {

        let totalboxes = mitems.querySelector(`.mitembox[data-name="${itemDetails.name}"]`);

        const mitembox = document.createElement('div');
        mitembox.classList.add('mitembox');

        const thumb = document.createElement('img');
        thumb.classList.add('thumb');
        thumb.src = './assets/images/image-baklava-thumbnail.jpg'; // Placeholder image, update as needed
        mitembox.appendChild(thumb);

        const idesc = document.createElement('div');
        idesc.classList.add('idesc');
        mitembox.appendChild(idesc);

        const miname = document.createElement('h6');
        miname.classList.add('miname');
        miname.textContent = detail.name;
        idesc.appendChild(miname);

        const mmbox = document.createElement('div');
        mmbox.classList.add('mmbox');
        idesc.appendChild(mmbox);

        const mqty = document.createElement('b');
        mqty.classList.add('mqty');
        mqty.textContent = detail.qty;
        mmbox.appendChild(mqty);

        const mprice = document.createElement('p');
        mprice.classList.add('mprice');
        mprice.textContent = detail.qtyprice;
        mmbox.appendChild(mprice);

        const totalQtyPrice = document.createElement('p');
        totalQtyPrice.classList.add('mqtyprice');
        totalQtyPrice.textContent = detail.qtyprice; // Update calculation if needed
        idesc.appendChild(totalQtyPrice);

        totalboxes.appendChild(mitembox);
    });

    // Store these values in variables
    const storedItemCount = numberOfItems;
    const storedOrderTotal = orderTotal;

    console.log('Number of items:', storedItemCount);
    console.log('Order total:', storedOrderTotal);
    console.log('Item details:', itemDetails);
});
