import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("TB_KEYWORD", { schema: "service" })
export class TbKeyword {
  @PrimaryGeneratedColumn({ type: "bigint", name: "TK_ID", unsigned: true })
  tkId: string;

  @Column("varchar", { name: "TK_USERNAME", length: 20 })
  tkUsername: string;

  @Column("varchar", { name: "TK_KEYWORD", length: 50 })
  tkKeyword: string;
}
