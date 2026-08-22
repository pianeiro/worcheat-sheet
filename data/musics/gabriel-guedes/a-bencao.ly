\version "2.25.35"

#(set-default-paper-size "a5")

\header {
  title = "A Bênção"
  composer = "Gabriel Guedes"
  copyright = "Como tocado em https://youtu.be/v8gaG2ed01I"
}


md = \mark \default
empty = \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}
groove = {\improvisationOn \hide Stem  b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \hide Stem \improvisationOff}
segno = {\mark \markup { \musicglyph #"scripts.segno" }}
coda = {\mark \markup { \musicglyph #"scripts.coda" }}

melody = \relative c'' {
  \key bes \major
  \mark "Intro"
  d4 c ees d d2 ees d d4 ees c1

  \repeat segno 2 {
    \md \bar "||" \repeat unfold 8 \empty \break
    \md \repeat volta 2 \repeat unfold 4 \empty \break
  }

  \md
  \repeat volta 6 {
    \repeat unfold 3 \empty
    \improvisationOn \hide Stem b4 4 4 4^"(6x)" \undo \hide Stem \improvisationOff
  }

  \md
  \repeat unfold 4 \empty
  \improvisationOn
    \repeat unfold 8 {b4} 
    \repeat unfold 8 {b8 8}  
  \improvisationOff

  \md
  \repeat volta 5 {
    \repeat unfold 3 \empty
    \improvisationOn \hide Stem b4 4 4 4^"(5x)" \undo \hide Stem \improvisationOff
  } \break

  \md
  \improvisationOn
    \repeat unfold 7 b1 b1\fermata
  \improvisationOff

}

harmony = \chordmode {
 
  % Intro
  g1:m7.11 ees:9 bes:9 f2:sus4 f

  \repeat segno 2 {
    %A
    b1:9 ees/g bes/f f2 fis:dim g1:m7.11 ees:9 bes2/d f:sus4 bes1
    %B
    \repeat volta 2 {g:m7.11 ees:9 bes:9/f f:sus4}
  }

  %C
  \repeat volta 6 {g1:m7.11 ees:9 bes9/d f:sus4}

  %D
  \repeat unfold 2 {g:m7.11 ees:9 bes:9/f f:sus4}

  %E
  \repeat volta 5 {g1:m7.11 ees:9 bes9/d f:sus4}

  %F
  \repeat unfold 2 {g:m7.11 ees:9 bes:9/f f:sus4}

  
}

\score {
  <<
    \new ChordNames {
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      \melody
    }
  >>

}