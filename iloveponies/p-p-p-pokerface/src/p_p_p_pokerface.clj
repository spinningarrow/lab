(ns p-p-p-pokerface)

(defn some-fn [args]
  (let [[d e] f
        lol]
    dude))

(defn rank [card]
  (let [[rank _] card
      char-ranks { \T 10 }]
    (if (Character/isDigit rank)
      (Integer/valueOf (str rank))
      (get char-ranks rank))))

(defn suit [card]
  (let [[_ suit] card]
    (str suit)))

(defn pair? [hand]
  nil)

(defn three-of-a-kind? [hand]
  nil)

(defn four-of-a-kind? [hand]
  nil)

(defn flush? [hand]
  nil)

(defn full-house? [hand]
  nil)

(defn two-pairs? [hand]
  nil)

(defn straight? [hand]
  nil)

(defn straight-flush? [hand]
  nil)

(defn value [hand]
  nil)
