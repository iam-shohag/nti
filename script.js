// Shopping Cart using jQuery
$(document).ready(function() {
    // Initialize cart
    let cart = {
        items: loadCart(),
        
        // Add item to cart
        addItem: function(name, price, image, quantity) {
            quantity = quantity || 1;
            const existingItem = this.items.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({
                    name: name,
                    price: parseFloat(price),
                    image: image,
                    quantity: quantity
                });
            }
            
            this.saveCart();
            this.updateCartCount();
            this.showNotification('Product added to cart!', 'success');
            
            if (window.location.pathname.includes('cart.html')) {
                this.renderCart();
            }
        },
        
        // Remove item from cart
        removeItem: function(name) {
            this.items = this.items.filter(item => item.name !== name);
            this.saveCart();
            this.updateCartCount();
            this.renderCart();
            this.showNotification('Product removed from cart!', 'info');
        },
        
        // Update item quantity
        updateQuantity: function(name, quantity) {
            const item = this.items.find(item => item.name === name);
            if (item) {
                if (quantity <= 0) {
                    this.removeItem(name);
                } else {
                    item.quantity = quantity;
                    this.saveCart();
                    this.updateCartCount();
                    this.renderCart();
                }
            }
        },
        
        // Get total price
        getTotal: function() {
            return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        
        // Save cart to localStorage
        saveCart: function() {
            localStorage.setItem('cart', JSON.stringify(this.items));
        },
        
        // Update cart count badge
        updateCartCount: function() {
            const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
            $('#cartCount, #cartCountMobile').text(count);
            if (count > 0) {
                $('#cartCount, #cartCountMobile').show();
            } else {
                $('#cartCount, #cartCountMobile').hide();
            }
        },
        
        // Render cart page
        renderCart: function() {
            const $cartItems = $('#cartItems');
            const $emptyCart = $('#emptyCart');
            const $cartTable = $('#cartTable');
            
            if (this.items.length === 0) {
                $cartTable.hide();
                $emptyCart.removeClass('d-none');
                this.updateTotals();
                return;
            }
            
            $cartTable.show();
            $emptyCart.addClass('d-none');
            
            let html = '';
            this.items.forEach(item => {
                html += `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="${item.image}" alt="${item.name}" class="rounded me-3" style="width: 80px; height: 80px; object-fit: cover;">
                                <div>
                                    <h6 class="mb-0">${item.name}</h6>
                                    <small class="text-muted">BDT: ${item.price.toFixed(2)}</small>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="input-group" style="width: 120px;">
                                <button class="btn btn-outline-secondary btn-sm" type="button" onclick="cart.updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
                                <input type="number" class="form-control form-control-sm text-center" value="${item.quantity}" min="1" onchange="cart.updateQuantity('${item.name}', parseInt(this.value))">
                                <button class="btn btn-outline-secondary btn-sm" type="button" onclick="cart.updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                            </div>
                        </td>
                        <td>BDT: ${item.price.toFixed(2)}</td>
                        <td><strong>BDT: ${(item.price * item.quantity).toFixed(2)}</strong></td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="cart.removeItem('${item.name}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            $cartItems.html(html);
            this.updateTotals();
        },
        
        // Update totals
        updateTotals: function() {
            const subtotal = this.getTotal();
            const tax = subtotal * 0.15;
            const total = subtotal + tax;
            
            $('#subtotal').text('BDT: ' + subtotal.toFixed(2));
            $('#tax').text('BDT: ' + tax.toFixed(2));
            $('#total').text('BDT: ' + total.toFixed(2));
        },
        
        // Show notification
        showNotification: function(message, type) {
            const alertClass = type === 'success' ? 'alert-success' : 'alert-info';
            const $notification = $(`
                <div class="alert ${alertClass} alert-dismissible fade show position-fixed top-0 end-0 m-3" style="z-index: 9999;">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `);
            
            $('body').append($notification);
            
            setTimeout(() => {
                $notification.fadeOut(() => $notification.remove());
            }, 3000);
        }
    };
    
    // Load cart from localStorage
    function loadCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }
    
    // Make cart global
    window.cart = cart;
    
    // Initialize cart count
    cart.updateCartCount();
    
    // Add to cart button handler
    $(document).on('click', '.add-to-cart', function() {
        const $btn = $(this);
        const name = $btn.data('product');
        const price = $btn.data('price');
        const image = $btn.data('image');
        cart.addItem(name, price, image);
    });
    
    // Add to cart from product details page
    $(document).on('click', '.add-to-cart-detail', function() {
        const $btn = $(this);
        const name = $btn.data('product');
        const price = $btn.data('price');
        const image = $btn.data('image');
        const quantity = parseInt($('#quantity').val()) || 1;
        cart.addItem(name, price, image, quantity);
    });
    
    // Product gallery for product details page
    $('.small-img').on('click', function() {
        const src = $(this).attr('src');
        $('#productImg').attr('src', src);
        $('.small-img').removeClass('border-primary').addClass('border-2');
        $(this).removeClass('border-2').addClass('border-primary');
    });
    
    // Set first image as active
    if ($('.small-img').length > 0) {
        $('.small-img').first().removeClass('border-2').addClass('border-primary');
    }
    
    // Quantity controls
    $('#decreaseQty').on('click', function() {
        const $input = $('#quantity');
        const currentValue = parseInt($input.val()) || 1;
        if (currentValue > 1) {
            $input.val(currentValue - 1);
        }
    });
    
    $('#increaseQty').on('click', function() {
        const $input = $('#quantity');
        const currentValue = parseInt($input.val()) || 1;
        $input.val(currentValue + 1);
    });
    
    // Product sort
    $('#sortSelect').on('change', function() {
        const sortOption = $(this).val();
        const $grid = $('#productsGrid');
        const $products = $grid.children();
        
        $products.sort((a, b) => {
            const priceA = parseFloat($(a).data('price') || 0);
            const priceB = parseFloat($(b).data('price') || 0);
            
            switch (sortOption) {
                case 'Sort by Price: Low to High':
                    return priceA - priceB;
                case 'Sort by Price: High to Low':
                    return priceB - priceA;
                default:
                    return 0;
            }
        });
        
        $products.detach().appendTo($grid);
    });
    
    // Checkout button - redirect to checkout page
    $('#checkoutBtn').on('click', function(e) {
        if (cart.items.length === 0) {
            e.preventDefault();
            cart.showNotification('Your cart is empty!', 'warning');
        }
    });
    
    // Render cart if on cart page
    if (window.location.pathname.includes('cart.html')) {
        cart.renderCart();
    }
    
    // Add padding to body for mobile floating footer
    if ($(window).width() < 768) {
        $('body').css('padding-bottom', '70px');
    }
    
    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            $('body').css('padding-bottom', '70px');
        } else {
            $('body').css('padding-bottom', '0');
        }
    });
    
    // Product card hover effects
    $('.product-card').hover(
        function() {
            $(this).find('.opacity-0').removeClass('opacity-0').addClass('opacity-100');
            $(this).find('img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.opacity-100').removeClass('opacity-100').addClass('opacity-0');
            $(this).find('img').css('transform', 'scale(1)');
        }
    );
    
    // Category card hover effects
    $('.card').hover(
        function() {
            if ($(this).find('.card-img').length) {
                $(this).find('.opacity-0').removeClass('opacity-0').addClass('opacity-100');
                $(this).find('.card-img').css('transform', 'scale(1.1)');
            }
        },
        function() {
            if ($(this).find('.card-img').length) {
                $(this).find('.opacity-100').removeClass('opacity-100').addClass('opacity-0');
                $(this).find('.card-img').css('transform', 'scale(1)');
            }
        }
    );
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        if (href !== '#' && href.length > 1) {
            const target = $(href);
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 600);
            }
        }
    });
});
