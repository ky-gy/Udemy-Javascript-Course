const express = require("express");
const cartsRepo = require("../Repositories/carts");
const productsRepo = require("../Repositories/products");
const cartShowTemplate = require("../views/carts/show");

const router = express.Router();

// Recieve a post request to ad dan item to a cart
router.post("/cart/products", async (req, res) => {
  console.log(req.body.productId);
  // Figure out the cart!
  let cart;
  if (!req.session.cartId) {
    // We don't have a car, we need to create one,
    // and store the cart id on the req.session.cartId
    // property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // We have a cart! let's get it from the repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    // increment quantity and save cart
    existingItem.quantity++;
  } else {
    // add new product id to items array
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.redirect("/cart");
});

// Recieve a GET request to show all items in cart
router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

// Recieve a post request to delete an item from a cart
router.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  const items = cart.items.filter((item) => item.id !== itemId);

  await cartsRepo.update(req.session.cartId, { items });

  res.redirect("/cart");
});

module.exports = router;
