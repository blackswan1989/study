## Ts Lint 사용 명령어

- test-tsnode-tslint.ts파일 린트 검사: `tslint test-tsnode-tslint.ts`

  ```
  // tslint.json

  {
      "rules": {
          "class-name": true,
          "comment-format": [
              true,
              "check-space"
          ],
          "curly":[true, "ignore-same-line"],
          "indent": [
              true,
              "spaces"
          ],
          "no-duplicate-variable": true,
          "no-eval": true,
          "no-internal-module": true,
          "no-trailing-whitespace": true,
          "no-var-keyword": true,           // var키워드 사용하지 않도록 설정
          "one-line": [
              true,
              "check-open-brace",
              "check-whitespace"
          ],
          "quotemark": [
              true,
              "double"
          ],
          "semicolon": true,
          "triple-equals": [
              true,
              "allow-null-check"
          ],
          "typedef-whitespace": [
              true,
              {
                  "call-signature": "nospace",
                  "index-signature": "nospace",
                  "parameter": "nospace",
                  "property-declaration": "nospace",
                  "variable-declaration": "nospace"
              }
          ],
          "variable-name": [
              true
          ],
          "whitespace": [
              true,
              "check-branch",
              "check-decl",
              "check-operator",
              "check-separator",
              "check-type"
          ]
      }
  }
  ```
