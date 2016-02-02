(prn "hello, there!")

;; world []

;; cell { :x 2, :y 3 }

;; helpers
(defn- neighbours
  "Compute the neighbours of a cell"
  [cell]
  (let [x (cell :x)
        y (cell :y)]
    #{
      { :x (dec x), :y (dec y) }
      { :x x, :y (dec y) }
      { :x (inc x), :y (dec y) }
      { :x (dec x), :y y }
      { :x (inc x), :y y }
      { :x (dec x), :y (inc y) }
      { :x x, :y (inc y) }
      { :x (inc x), :y (inc y) }
      }))

(defn- live-neighbours
  "Get the live neighbours of a cell"
  [cell world]
  (clojure.set/intersection world (neighbours cell)))

(defn- transition
  "Get the next state of a cell"
  [cell world]
  (let [n (count (live-neighbours cell world))]
    (if (or (< n 2) (> n 3))
      nil
      cell)))

(defn- enliven
  "Make alive cells that are dead"
  [world]
  (let [newborns (map
                   #(when (= 2 (count (live-neighbours %1 world)))
                      (apply clojure.set/intersection
                             (flatten [(neighbours %1) (map neighbours (live-neighbours %1 world))])))
                   world)]
    (apply clojure.set/union newborns)))

(defn- draw
  "Represents the world visually"
  [world]
  (let [width (inc (apply max (map :x world)))
        height (inc (apply max (map :y world)))
        side (max width height)
        row (vec (replicate side "_ "))
        grid (vec (replicate side row))
        world-struct (reduce
                       #(update-in %1 [(:y %2) (:x %2)] (fn [] "# "))
                       grid
                       world)]
    (println (clojure.string.join "\n" (map #(apply str %) world-struct)))))

;; main
(defn tick
  "Get the next state of the world"
  [world]
  (let [w (map #(transition % world) world)
        clean-w (remove nil? w)
        lw (enliven world)]
    (clojure.set/union lw (set clean-w))))

;; init
;; (def world #{ { :x 0, :y 0 }, { :x 2, :y 4 }, { :x 6, :y 6 } })
;; (def world #{{:y 1, :x 0}  {:y 0, :x 0}  {:y 1, :x 1}  {:y 0, :x 1}})
(def world #{{:y 1, :x 0}  {:y 0, :x 0}  {:y 1, :x 1}  {:y 0, :x 1}})
(def g #{{:y 2, :x 1}  {:y 2, :x 2}  {:y 2, :x 3}})
