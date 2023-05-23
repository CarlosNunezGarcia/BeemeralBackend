const { Subscription } = require('../models/subscription.model');

class SubscriptionController {
  // 1. Crear suscripción
  async createSubscription(req, res) {
    try {
      const { plans, price, export: _export, render, space, tokenization } = req.body;

      const subscription = await Subscription.create({
        plans,
        price,
        export: _export,
        render,
        space,
        tokenization,
      });

      res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error: 'Ha ocurrido un error' });
    }
  }

  // 2. Obtener todas las suscripciones
  async getAllSubscriptions(req, res) {
    try {
      const subscriptions = await Subscription.findAll();
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: 'Ha ocurrido un error' });
    }
  }

  // 3. Editar suscripción
  async editSubscription(req, res) {
    try {
      const id = req.params.subscription_id;
      const { plans, price, export: _export, render, space } = req.body;

      const subscription = await Subscription.findByPk(id);

      if (!subscription) {
        return res.status(404).json({ error: 'Suscripción no encontrada' });
      }

      subscription.plans = plans;
      subscription.price = price;
      subscription.export = _export;
      subscription.render = render;
      subscription.space = space;

      await subscription.save();

      res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error: 'Ha ocurrido un error' });
    }
  }
}

module.exports = new SubscriptionController();
