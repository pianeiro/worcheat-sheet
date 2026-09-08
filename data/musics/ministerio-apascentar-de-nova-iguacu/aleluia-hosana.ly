\version "2.25.35"

#(set-default-paper-size "a5")
#(set-global-staff-size 19)

\header {
  title= "Aleluia Hosana"
  %subtitle= ""
  composer= "Min. Aspacentar de Nova Iguaçu"
  %poet = ""
  %copyright= "OPD (on behalf of Onimusic); Abramus Digital, LatinAutor, LatinAutorPerf, and 1 Music Rights Societies"
  tagline= "Como tocado em: https://youtu.be/3GtFSFcQ4FU"
}

md = \mark \default
empty = { \fixed c' {\improvisationOn \hide Stem b4 4 4 4 \undo \hide Stem \improvisationOff}}
emptyAnt = { \fixed c' {\improvisationOn \hide Stem b4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 4 4 \undo \hide Stem \improvisationOff}}
%coda = {\mark \markup { \musicglyph #"scripts.coda" }}



melody = \relative c' {

  \key e \major

  \mark "Intro"
  \repeat volta 2 \repeat unfold 4 \empty \break

  \md
  \repeat volta 2 {
    \improvisationOn
      b'4 r2. b8 8 r2. b4 r2. b1 
    \improvisationOff
  } \break

  \repeat segno 2 {

    \repeat volta 2 \repeat unfold 4 \empty \break

    \md
    \repeat unfold 9 \emptyAnt \bar "||"

    \alternative {
      \volta 1 {
        \improvisationOn
          \hide Stem b4 4 \undo \hide Stem
          b8. 16~8 8~
          \hide Stem b4 4 4 4 \undo \hide Stem
        \improvisationOff
      }
      \volta 2 {
        \bar "||" \empty
      }
    }
  }
  \break

  \bar "||"
  \md
  \improvisationOn
    b2 2 2 2 2 2 1
    \hide Stem
      b4 4 4 4 4
    \undo \hide Stem
    r8 b8~2
    \hide Stem
      4 4 4 \undo \hide Stem r8 8~ \hide Stem
      4 4 \undo \hide Stem \appoggiatura b8 \hide Stem 
      \key f \major 4 4
    \undo \hide Stem
  \improvisationOff
  \break

  \bar "||"
  \md
  \repeat unfold 6 \emptyAnt
  \improvisationOn
    \repeat unfold 2 {b8. 16 \hide Stem 4 \undo \hide Stem}
    b8. 16~8 8~ \hide Stem \undo b4 4 4 \hide Stem
  \improvisationOff
  \break

  \md
  \repeat volta 2 \repeat unfold 7 \emptyAnt \break
 
  \md
  \repeat percent 3 {
    \improvisationOn
      \repeat unfold 2 {b8. 16 \hide Stem 4 \undo \hide Stem}
    \improvisationOff
    \emptyAnt
  }
  \improvisationOn
    r16 b8. 4 8. 16~4 1\fermata
  \improvisationOff

}

harmony = \chordmode {

  % Intro
  \repeat volta 2 {e1 b/e a/e b/e}

  % A
  \repeat volta 2 {e1 b/e a/e d:7}

  \repeat segno 2 {
    \repeat volta 2 {e1 b/e a/e d:7}

    % B
    gis2:m7 cis:m7  gis:m7 cis:m7 d:maj7 a/cis fis:m7 a4/b b/a
    gis2:m7 cis:m7 gis:m7 a:maj7 fis:m7 a/b 
    a:maj7 e/gis fis:m7 a/b

    \alternative {
      \volta 1 {e2 b4./e a8/e~1}
      \volta 2 {e1}
    }  
  }

  % C
  cis2:m7 b/dis e fis/ais fis:m7 gis:m7 cis1:m7
  fis2:m7 gis:m7 cis4.:m7 fis8/ais~2
  fis8:m7~2. a8/b~4. bes8/c~2

  % D
  a2:m7 d:m7 a:m7 d:m7 ees:maj7 bes/d g:m7 bes4/c c/bes
  a2:m7 d:m7 a2:m7 d:m7
  g2:m7 a:m7 bes1/c 

  % E
  \repeat volta 2 {
    a2:m7 d:m7 a:m7 d:m7 ees:maj7 bes/d g:m7 bes4/c c/bes
    a2:m7 d:m7 a2:m7 bes:maj7 g:m7 bes/c
  }

  % F
  \repeat percent 3 {g2:m7 f/a bes bes/c}
  r16 ges8.:maj7 bes4:maj7 bes2/c f1


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