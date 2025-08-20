abstract class Animal {
    abstract void eat();
}

abstract class Bird {
    abstract void fly();
}

class Bat extends Animal {
    Bird birdPart = new Bird() {
        void fly() {
            System.out.println("Bat can fly.");
        }
    };

    void eat() {
        System.out.println("Bat eats insects.");
    }

    void fly() {
        birdPart.fly();
    }
}


class ques1 {
    public static void main(String[] args) {
        Bat b = new Bat();
        b.eat();
        b.fly();
    }
}
