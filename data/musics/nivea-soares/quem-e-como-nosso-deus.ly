\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Quem é como nosso Deus?"
  %subtitle= ""
  composer= "Nívea Soares"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/QRilv78Rroc"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
halfEmpty = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key f \major

  \partial 4 d'16 e f d
  
  \repeat volta 2 {
    \mark "Intro"
    f8. e16 d2 d16 e f d g8. f16 e2. d4 a'2. c,4 g'2.
    \bar "||"
    \break

    \md
    \repeat unfold 7 \empty
  } \alternative {
    \volta 1 {
      \improvisationOn
        \hide Stem
          b,4 4 4
        \undo \hide Stem
      \improvisationOff
      d16 e f d
    }
    \volta 2 \empty
  }
  \break

  \md \repeat volta 2 \repeat unfold 4 \empty \break

  \md
  \improvisationOn
    b1 1 1 b8 8 8 8 8 8 4
  \improvisationOff
  \break

  \md
  \repeat volta 2 {
    \improvisationOn
      \repeat percent 4 {b16 b b b r8 b16 b b b r8 b16 b r8}
    \improvisationOff
  }

  \md \repeat volta 2 \repeat unfold 4 \empty \break
  \md \repeat volta 2 \repeat unfold 4 \empty \break
  \md \repeat volta 2 {
    \repeat unfold 3 \empty
    \improvisationOn
      \hide Stem
        b4 4 4 4^"(4x)"
      \undo \hide Stem
    \improvisationOff
  }


}

harmony = \chordmode {

  % Intro
  s4 
  \repeat volta 2 {
    bes1 c d:m7 a:m7
    % A
    bes1 c d:m7 a:m7 bes1 c d:m7
  } \alternative {
    \volta 1 a:m7
    \volta 2 a:m7
  }

  % B
  \repeat volta 2 {bes1 g:m7 d:m7 a:m7}

  %C
  bes1 c d:m7 a:m7

  % D
  \repeat volta 2 {bes1 c d:m7 a:m7}

  \repeat volta 2 {bes1 g:m7 d:m7 a:m7}
  \repeat volta 2 {bes1 g:m7 d:m7 a:m7}
  \repeat volta 2 {bes1 g:m7 d:m7 a:m7}
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