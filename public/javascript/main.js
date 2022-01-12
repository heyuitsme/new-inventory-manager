
// nav functions
let nav = (path) => {
    window.location.href = path;
};

let back = () => {
    history.back();
}


// pre-fill create form
let fill = () => {
    document.getElementById('product_name').value = 'Thruster K15';
    document.getElementById('brand').value = 'Victor';
    document.getElementById('sku').value = 'TK15';
    document.getElementById('quantity').value = 3;
    document.getElementById('price').value = 149.99;
    document.getElementById('cost').value = 109.99;
    document.getElementById('ext_description').value = 'The TK15. Slightly better than the Nanospeed 9900, but way nicer.';
    document.getElementById('product_img').value = 'https://m.media-amazon.com/images/I/31Y0F61pG0L._AC_.jpg';
    document.getElementById('ext_product_url').value = 'https://www.canuckstuff.com/store/badminton/badminton-racquets/victor/thruster/victor-thruster-k-15-final-sale/1903';
    document.getElementById('int_notes').value = 'Das badminton.';
};


// delete inventory helper
let deleteInventory = (id) => {
    const url = '/api/inventory/' + id;
    fetch(url, {method: 'DELETE'});
    location.reload();
};

