(ns sicp-clojure.core
  (:gen-class))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "I am a teapot"))

; Exercise 1.1
; Nothing to do here.

; Exercise 1.2
; 5 + 1/2 + (2 - (3 - (6 + 1/5))) /  3(6-2)(2-7)
(/
   (+ 5 (/ 1 2) (- 2 (- 3 (+ 6 (/ 1 5)))))
   (* 3 (- 6 2) (- 2 7)))

; Exercise 1.3
(defn square [x]
  (* x x))

(defn sum-of-squares [x y]
  (+ (square x) (square y)))

(defn exercise-1-3 [a b c]
  (apply sum-of-squares (rest (sort [a b c]))))

(exercise-1-3 3 1 2) ; test

; Exercise 1.4
; Nothing to do here.

; Exercise 1.5
; Nothing to do here.
