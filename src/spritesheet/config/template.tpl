.icon {
    &::before {
        content: ' ';
        background-image: url("{{{cssPathSvg}}}");
        background-repeat: no-repeat;
        background-size: {{width}}{{units}} {{height}}{{units}};
        display: inline-block;
        {{#cssPathNoSvg}}
        .no-svg & {
            background-image: url("{{{cssPathNoSvg}}}");
        }
        {{/cssPathNoSvg}}
    }
}

{{#sprites}}
.icon-{{fileName}} {
    &::before {
        background-position: {{x}}{{units}} {{y}}{{units}};
        height: {{h}}{{units}};
        width: {{w}}{{units}};
    }
}
{{/sprites}}