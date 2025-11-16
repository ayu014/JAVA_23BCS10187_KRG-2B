class polymorphism {
    static class Animal {
        void sound() { System.out.println("Animal sound"); }
    }

    static class Dog extends Animal {
        @Override
        void sound() { System.out.println("Dog barks"); }
    }

    public static void main(String[] args) {
        Animal a = new Dog(); // runtime polymorphism
        a.sound();
    }
}
