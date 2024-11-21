% Facts about different animals
animal(dog).
animal(cat).
animal(bird).
animal(bear).
animal(fish).
animal(turtle).

% Rules to pick animals
is_animal(X) :-
    write("Please Answer yes/no"), nl,
    ask("Does it have feathers?", Answer1),
    ( Answer1 = yes -> 
        X = bird
    ; Answer1 = no ->
        ask("Does it live in water?", Answer2),
        ( Answer2 = yes -> 
            ask("Does it breath air?", Answer3),
            ( Answer3 = yes -> 
                X = turtle
            ; Answer3 = no ->
                X = fish
            )
        ; Answer2 = no ->
            ask("Can it be a pet?", Answer4),
            ( Answer4 = yes -> 
                ask("Does it bark?", Answer5),
                ( Answer5 = yes -> 
                    X = dog
                ; Answer5 = no ->
                    X = cat
                )
            ; Answer4 = no ->
                X = bear
            )
        )
    ).

% Asking questions
ask(Question, Answer) :-
    format("~w (yes/no): ", [Question]),
    read(Answer).

% Query to identify an animal
identify :-
    is_animal(Animal),
    format("The animal is: ~w~n", [Animal]).

% Fallback incase no animal matches
identify :-
    \+ is_animal(_),
    write("Sorry, I could not identify the animal."), nl.
