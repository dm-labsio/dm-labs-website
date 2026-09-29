import { readFileSync, readdirSync } from "node:fs";
import { resolve, extname } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
const root=resolve(import.meta.dirname,"..");
function files(dir:string):string[] { return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(resolve(dir,e.name)):[resolve(dir,e.name)]); }
describe("Website copy punctuation",()=>{
  it("has no em dashes in rendered copy or metadata, including encoded forms",()=>{
    const found:string[]=[];
    for(const file of [...files(resolve(root,"client/src")),resolve(root,"scripts/prerender-meta.mjs")].filter(f=>/\.(tsx?|mjs)$/.test(f))){
      const source=readFileSync(file,"utf8");
      const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,extname(file)===".tsx"?ts.ScriptKind.TSX:ts.ScriptKind.TS);
      const visit=(n:ts.Node)=>{
        if(ts.isStringLiteralLike(n)||ts.isJsxText(n)||ts.isTemplateHead(n)||ts.isTemplateMiddle(n)||ts.isTemplateTail(n)) {
          if(/\u2014|&mdash;|&#8212;|&#x2014;|\\u2014/i.test(n.getText(sf)))found.push(file+":"+sf.getLineAndCharacterOfPosition(n.pos).line);
        }
        ts.forEachChild(n,visit);
      };visit(sf);
    }
    for(const file of files(resolve(root,"client/public/previews")).filter(f=>f.endsWith('.html'))){
      if(/\u2014|&mdash;|&#8212;|&#x2014;/i.test(readFileSync(file,'utf8')))found.push(file);
    }
    expect(found).toEqual([]);
  });
});
