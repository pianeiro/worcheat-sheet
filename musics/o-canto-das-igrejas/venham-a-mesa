\version "2.25.32"

#(set-default-paper-size "a5")

\header {
title = "Venham à mesa"
composer = "Marsena"
%copyright = "Como tocado em https://youtu.be/mZ9yZYo9Mmk?si=9pqL4BI1IgY7mcr3"
}


md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem \omit Dots b4. 4. \revert Dots.stencil \undo \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  % Intro
  \mark "Intro"
  s1*0^"(piano)" \repeat unfold 4 \empty

  \md \repeat volta 2 {\repeat unfold 4 \empty}

  \md \repeat unfold 4 \empty

  \md \repeat volta 2 {\repeat unfold 4 \empty} s1*0^"(+ violão)" \empty

  \md
  \repeat volta 2 {\repeat unfold 7 \empty s1*0^"(+ banda)" \empty}

  \md \repeat unfold 4 \empty

  \md \repeat volta 2 {\repeat unfold 4 \empty}

  \md \repeat volta 2 {\repeat unfold 8 \empty}

  \md
  \improvisationOn
    \repeat volta 2 {\repeat unfold 4 {b4. b}}
    \repeat volta 2 {\repeat unfold 7 {b8 8 8} 8 8 8^"(piano)"}
  \improvisationOff

  \md
  \repeat unfold 4 \empty
  \improvisationOn
    b4.^"(+ banda)"
    \repeat unfold 3 b 
    \repeat unfold 2 {b8 8 8 8 8 8}
  \improvisationOff

  \repeat volta 2 {\repeat unfold 7 \empty s1*0^"(4x)" \empty }

  \md s1*0^"(piano)" \repeat unfold 4 \empty

  \md \repeat volta 2 {\repeat unfold 4 \empty}
  \improvisationOn
    b2.\fermata
  \improvisationOff

}

harmony = \chordmode {
 
  % Intro
  a2.:m7 f c g:sus/b

  % A
  \repeat volta 2 {a2.:m7 f c g:sus/b}

  % B (impro. piano)
  a2.:m7 f c g:sus/b

  % c
  \repeat volta 2 {a2.:m7 f c g:sus/b} 2.

  % D
  \repeat volta 2 {c1. c/e f a2.:m7 g:sus}

  %E
  a2.:m7 f c g:sus/b

  %F
  \repeat volta 2 {a2.:m7 f c g:sus/b}

  % G
  \repeat volta 2 {c1. c/e f a2.:m7 g:sus}

  % H
  \repeat unfold 2 {
    \repeat volta 2 {d2.:m7  f c g:sus}
  }

  % 
  \repeat unfold 2 {c1. c/e f a2.:m7 g:sus}

  %
  \repeat unfold 2 {a2.:m7 f c g:sus/b} 2.
  
}

\score {
<<
  \new ChordNames {
    \set chordChanges = ##t
    \harmony
  }
  \new Staff {
    \key c \major
    \time 6/8
    \melody
  }
>>

}