const mockData = {
    inventory: [
        {
            product_name: 'Nanospeed 9900',
            brand: 'Yonex',
            sku: 'NS9900CD',
            quantity: 4,
            price: 199.99,
            cost: 149.99,
            category_id: 1,
            ext_description: "Built for top athletes, with a graphite core, and narrow frame.",
            product_img: "http://www.yonex.co.uk/_assets/images/cache/products/productmain/badminton-racquets-nanospeed-9900-main.jpg",
            ext_product_url: "http://www.yonex.co.uk/products/badminton/racquets/nanospeed-series/nanospeed-9900",
            int_notes: "Discontinued model, replaced by Nanoray 900."
        },
        {
            product_name: 'Ryzen 5 5600X',
            brand: 'AMD',
            sku: 'RZ5600XCD',
            quantity: 20,
            price: 359.99,
            cost: 319.99,
            category_id: 2,
            ext_description: "Built for top PC enthusiasts.",
            product_img: "https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1384_.jpg",
            ext_product_url: "https://www.amazon.com/AMD-Ryzen-5600X-12-Thread-Processor/dp/B08166SLDF",
            int_notes: "Always mark down. ALWAYS."
        },
        {
            product_name: '2021 Veloster N',
            brand: 'Hyundai',
            sku: 'VN22SK',
            quantity: 2,
            price: 249.99,
            cost: 199.99,
            category_id: 3,
            ext_description: "Built for top auto enthusiasts.",
            product_img: "https://cdn.jdpower.com/JDPA_2021%20Hyundai%20Veloster%20N%20Black%20Front%20Quarter%20View.jpg",
            ext_product_url: "https://www.hyundaicanada.com/en/showroom/2021/veloster-n",
            int_notes: "Wish it was as nice as the GTI..."
        }
    ],
    category: [
        { category_name: 'Sports' },
        { category_name: 'Technology' },
        { category_name: 'Auto' }
    ]
};



module.exports = {mockData};

