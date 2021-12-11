:- use_module(library(lists)).
:- use_module(library(format)).
:- use_module(library(dom)).

% regeln
report_esv(ESV, R) :- 
	append(
	 	"LV parameters based on Simpsons method of discs, normal range in parentheses: 
	EDV ", 
        ESV,
        R1),
    append(
        R1, "ml (109 - 232 ml)¹; 
        1) Petersen et al. 2017;",
        R2),
    atomic_list_concat(R2, R).
  
esv(Y) :-
 	get_by_id('input_esv', ESV_element),
    attr(ESV_element, value, X),
    atom_chars(X,Y).
      
render :-
	esv(ESV),
	report_esv(ESV, ESV_Text),
    create(p, P),
    html(P, ESV_Text),
    get_by_id('ausgabe', Parent),
    append_child(Parent, P).
