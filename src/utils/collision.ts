export const checkCollision = (obj1: GameObject, obj2: GameObject): boolean => {
  return (
    obj1.x < obj2.x + obj2.width &&  // Mengecek apakah sisi kiri obj1 melewati sisi kanan obj2
    obj1.x + obj1.width > obj2.x &&  // Mengecek apakah sisi kanan obj1 melewati sisi kiri obj2
    obj1.y < obj2.y + obj2.height && // Mengecek apakah sisi atas obj1 melewati sisi bawah obj2
    obj1.y + obj1.height > obj2.y    // Mengecek apakah sisi bawah obj1 melewati sisi atas obj2
  );
};
