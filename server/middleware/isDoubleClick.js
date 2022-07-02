let Idempotency_Key_Array = [];

export const isDoubleClick = async (req, res, next) => {
  const Idempotency_Key = req.get('Idempotency_Key');

  if (!Idempotency_Key) {
    return res.status(403).json('Not have Idempotency_Key');
  }

  if (Idempotency_Key_Array.length === 0) {
    Idempotency_Key_Array.push(Idempotency_Key);
  }

  if (Idempotency_Key_Array.length !== 0) {
    Idempotency_Key_Array[0] === Idempotency_Key &&
      res.status(403).json('prevent double click duplitcated event!');
  }
  next();
};
