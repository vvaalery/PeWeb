document.addEventListener('DOMContentLoaded', () => {
    const products = new Map();
    const images = new Map();

    const imageUrls = [
        'https://i.pinimg.com/236x/16/ba/52/16ba524eca5b88ea8dee2a0414fb7f6b.jpg',
        'https://i.pinimg.com/236x/4f/49/ab/4f49ab952041345d83a769e2cf48a835.jpg',
        'https://i.pinimg.com/236x/cf/0d/32/cf0d327429342397ab339bc2c6d5e57a.jpg',
        'https://i.pinimg.com/236x/4d/6d/4c/4d6d4cb811e4a9922f14d38f87e36541.jpg',
        'https://i.pinimg.com/474x/c5/cd/5c/c5cd5ca57cde57f8be370875821b6900.jpg',
        'https://i.pinimg.com/236x/a9/a4/5d/a9a45d2ec59a2de26b853ba4a476ea97.jpg',
        'https://i.pinimg.com/236x/ef/f4/4f/eff44fa9f0368b6752f57c5e93a7232c.jpg',
        'https://i.pinimg.com/236x/6a/40/70/6a40707e70a0668da18b7eae817bc866.jpg',
        'https://i.pinimg.com/474x/67/d9/23/67d92347d864eb2e4d713e4b8a9db2d3.jpg',
        'https://i.pinimg.com/236x/23/85/cf/2385cf826caee6ab73de046c9fa074af.jpg',
        'https://i.pinimg.com/236x/59/99/d1/5999d1d25e86e9bcce4f1f2f2751f486.jpg',
        'https://i.pinimg.com/236x/9d/1e/bd/9d1ebd85dbd9b8143c4ece4f79238e14.jpg',
        'https://i.pinimg.com/236x/0b/39/1f/0b391fae9bc5f4d307037c2fc97ae648.jpg',
        'https://i.pinimg.com/236x/a3/e9/4b/a3e94b26009bac0ef6c9a04d9090be4b.jpg',
        'https://i.pinimg.com/236x/1c/39/2f/1c392f26bc29da848cc3aa41efc2899b.jpg',
        'https://i.pinimg.com/236x/8a/9f/92/8a9f92c7bba561ed171da3bbfbc94761.jpg',
        'https://i.pinimg.com/236x/1e/f6/95/1ef69555ea382f84bc6f3cf2980542ed.jpg',
        'https://i.pinimg.com/236x/a5/10/14/a51014be2f692e3bb2521b86dd0579e6.jpg',
        'https://i.pinimg.com/474x/bb/2b/1e/bb2b1ec058d39e9754a5dafaf0140ef6.jpg',
        'https://i.pinimg.com/236x/87/37/f9/8737f953dc21016286672aad056d80dc.jpg',
        'https://i.pinimg.com/236x/36/f8/90/36f8907ed1c5fd9fa55d46db1ab9ce26.jpg',
        'https://i.pinimg.com/474x/ec/fb/2c/ecfb2c0610613e46d188a6db62b06186.jpg',
        'https://i.pinimg.com/236x/5a/26/2b/5a262b9368557ac6c9007c373270e6d2.jpg',
        'https://i.pinimg.com/236x/df/e9/f7/dfe9f7265a6c7033dcc8fce838806d05.jpg',
        'https://i.pinimg.com/236x/1b/98/35/1b9835df8bf2b8cbc491b53d6eed5d36.jpg',
        'https://i.pinimg.com/236x/c7/84/d0/c784d04140574af801ca3095b928d8d5.jpg',
        'https://i.pinimg.com/236x/97/31/62/9731625836eb9503eade75b3a95652f8.jpg',
        'https://i.pinimg.com/236x/19/ee/0a/19ee0a0a96b9b29df312a81974875868.jpg',
        'https://i.pinimg.com/236x/14/61/27/146127dee3b0771be0166360490e927c.jpg',
        'https://i.pinimg.com/236x/c6/60/54/c66054cf7c81e8da86e7270f739fb4d3.jpg'
    ];

    const generateProducts = () => {
        for (let i = 1; i <= 30; i++) {
            const productName = `Товар ${i}`;
            const article = `ART-${1000 + i}`;
            const price = Math.floor(Math.random() * 900) + 100;
            
            products.set(productName, { 
                article, 
                price,
                image: imageUrls[i-1] 
            });
        }
    };

    const createColumns = () => {
        const container = document.querySelector('.columns-container');
        container.innerHTML = '';
        
        const productGroups = [
            Array.from(products).slice(0, 10),
            Array.from(products).slice(10, 20),
            Array.from(products).slice(20, 30)
        ];
        
        productGroups.forEach((group, index) => {
            const column = document.createElement('div');
            column.className = 'price-column';
            column.innerHTML = `<h3>Страница ${index + 1}</h3><table><thead><tr><th>Товар</th><th>Артикул</th><th>Цена</th></tr></thead><tbody id="column-${index}"></tbody></table>`;
            container.appendChild(column);
            
            const tbody = document.getElementById(`column-${index}`);
            group.forEach(([name, data]) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${name}</td>
                    <td>${data.article}</td>
                    <td class="price-cell" data-article="${data.article}">${data.price} $</td>
                `;
                tbody.appendChild(row);
            });
        });
    };

    const handlePriceClick = (function() {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const modalArticle = document.getElementById('modal-article');
        const closeBtn = document.querySelector('.close-btn');
        const sizeSelect = document.getElementById('image-size');

        closeBtn.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => e.target === modal && (modal.style.display = 'none'));
        document.addEventListener('keydown', (e) => e.key === 'Escape' && (modal.style.display = 'none'));

        const updateSize = () => {
            modalImage.className = sizeSelect.value;
        };
        sizeSelect.addEventListener('change', updateSize);

        return function(article) {
            const product = Array.from(products.values()).find(p => p.article === article);
            if (product) {
                modalArticle.textContent = `Артикул: ${article}`;
                modalImage.src = product.image;
                updateSize();
                modal.style.display = 'block';
            }
        };
    })();

    const init = () => {
        generateProducts();
        createColumns();
        
        document.querySelectorAll('.price-cell').forEach(cell => {
            cell.addEventListener('click', () => {
                handlePriceClick(cell.dataset.article);
            });
        });
    };

    init();
});