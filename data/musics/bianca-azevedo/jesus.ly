\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Jesus"
  %subtitle= ""
  composer= "Bianca Azevedo"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/fn2RLP6Tpfc"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key ees \major

  \mark "Intro"
  \repeat percent 2 {r8 ees ees f f4 g} 
  r8 ees ees f aes4 g c1
  \break

  \repeat segno 2 {
    \md \repeat volta 2 \repeat unfold 4 \empty \break

    \md
    \repeat percent 2 {\empty \empty}
    \repeat unfold 4 \empty
    \break
  }

  \md
  \repeat volta 4 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(4x)"
      \undo \hide Stem
    \improvisationOff
  } \break

  \md
  \repeat percent 2 {\empty \empty}
  \repeat unfold 4 \empty^"(Improvisação piano)" \bar "||"
  \break

  \md
  \repeat percent 2 {\empty \empty}
  \repeat unfold 4 \empty
  \break

  \md
  \repeat volta 2 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(on cue)"
      \undo \hide Stem
    \improvisationOff
  } \break

  \md
  \repeat percent 2 {\empty \empty}
  \repeat unfold 3 \empty
  \improvisationOn b1\fermata \improvisationOff \bar "|."
  

}

harmony = \chordmode {

  % Intro
  ees1 ees/g aes1 1

  \repeat segno 2 {
    % A
    \repeat volta 2 {ees1 ees/g aes1 1}

    % B
    \repeat percent 2 {c2:m7 bes/d ees1}
    aes2 bes c1:m7 aes1 bes1
  }

  %C
  \repeat volta 4 {aes1 bes c:m7 aes/g}

  % D
  \repeat percent 2 {c2:m7 bes/d ees1}
  aes2 bes c1:m7 aes1 bes1

  % E
  \repeat percent 2 {c2:m7 bes/d ees1}
  aes2 bes c1:m7 aes1 bes2 ees/g

  % F
  \repeat volta 2 {aes1 bes c:m7 ees/g}

  % G
  \repeat percent 2 {c2:m7 bes/d ees1}
  aes2 bes c1:m7 aes2 c:m7 bes1

}

\score {
  <<
    \new ChordNames {
      \set additionalPitchPrefix = #"add"
      \set chordChanges = ##t
      \harmony
    }
    \new Staff {
      %\tempo "Adagietto" 4 = 64
      \melody
    }
  >>
  \layout{}
  \midi{}
}